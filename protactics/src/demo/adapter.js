// Axios adapter that answers every request in the browser, from the demo
// database, instead of sending it over the network.
import { AxiosError, AxiosHeaders } from 'axios';
import { API_URL } from '@/config';
import { loadDb, saveDb } from './db';
import { HttpError, authenticate, optionalUser } from './http';
import cuentas from './handlers/cuentas';
import plantilla from './handlers/plantilla';
import entrenamientos from './handlers/entrenamientos';
import comunidad from './handlers/comunidad';

const MIN_LATENCY_MS = 150;
const MAX_LATENCY_MS = 350;

const STATUS_TEXT = {
  200: 'OK', 201: 'Created', 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden',
  404: 'Not Found', 409: 'Conflict', 500: 'Internal Server Error',
};

const compile = ([method, pattern, handler]) => {
  const names = [];
  const source = pattern.replace(/:([a-z_]+)/gi, (_, name) => {
    names.push(name);
    return '([^/]+)';
  });
  return { method, pattern, handler, regex: new RegExp(`^${source}/?$`), names };
};

const routes = [...cuentas, ...plantilla, ...entrenamientos, ...comunidad].map(compile);

const match = (method, path) => {
  for (const route of routes) {
    if (route.method !== method) continue;
    const found = route.regex.exec(path);
    if (found) {
      const params = Object.fromEntries(route.names.map((name, i) => [name, decodeURIComponent(found[i + 1])]));
      return { route, params };
    }
  }
  return null;
};

const apiBasePath = new URL(API_URL).pathname.replace(/\/+$/, '');

function resolveUrl(config) {
  const url = config.url || '';
  const absolute = /^[a-z][a-z\d+\-.]*:\/\//i.test(url);
  const full = absolute || !config.baseURL
    ? url
    : `${config.baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  const parsed = new URL(full, API_URL);
  let path = parsed.pathname;
  if (apiBasePath && path.startsWith(apiBasePath)) path = path.slice(apiBasePath.length) || '/';
  return { href: parsed.href, path, searchParams: parsed.searchParams };
}

function parseBody(data) {
  if (data == null || data === '') return {};
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    const body = {};
    data.forEach((value, key) => { body[key] = value; });
    return body;
  }
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  }
  return typeof data === 'object' ? data : {};
}

const delay = () => new Promise((resolve) => {
  setTimeout(resolve, MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS));
});

// Responses are deep copies so components can never mutate the database.
const clone = (value) => (value === undefined ? undefined : JSON.parse(JSON.stringify(value)));

async function dispatch(method, path, request) {
  const found = match(method, path);
  if (!found) {
    console.warn(`[demo] Endpoint no simulat: ${method} ${path}`);
    throw new HttpError(404, `Endpoint no disponible a la demo: ${method} ${path}`);
  }

  const db = loadDb();
  let dirty = false;
  const ctx = {
    ...request,
    params: found.params,
    db,
    auth: () => authenticate(request.headers, db),
    optionalUser: () => optionalUser(request.headers, db),
    changed: () => { dirty = true; },
  };
  const result = await found.route.handler(ctx);
  if (dirty) saveDb(db);
  return result;
}

export function createDemoAdapter() {
  return async function demoAdapter(config) {
    await delay();

    const method = (config.method || 'get').toUpperCase();
    const { href, path, searchParams } = resolveUrl(config);
    const headers = AxiosHeaders.from(config.headers || {});
    const query = { ...Object.fromEntries(searchParams), ...(config.params || {}) };
    const body = parseBody(config.data);

    let status;
    let data;
    try {
      ({ status, data } = await dispatch(method, path, { method, path, query, headers, body }));
    } catch (error) {
      if (error instanceof HttpError) {
        ({ status, body: data } = error);
      } else {
        console.error('[demo] Error intern de la API simulada:', error);
        status = 500;
        data = { error: 'Error del servidor.' };
      }
    }

    const request = { responseURL: href, status, demo: true };
    const response = {
      data: clone(data),
      status,
      statusText: STATUS_TEXT[status] || '',
      headers: new AxiosHeaders({ 'content-type': 'application/json; charset=utf-8' }),
      config,
      request,
    };

    const validateStatus = config.validateStatus || ((s) => s >= 200 && s < 300);
    if (validateStatus(status)) return response;
    throw new AxiosError(
      `Request failed with status code ${status}`,
      status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
      config,
      request,
      response,
    );
  };
}
