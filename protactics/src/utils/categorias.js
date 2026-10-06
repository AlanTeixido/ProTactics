// Display names for the training categories stored by FormCrearEntreno / EditarEntrenamiento.
export const CATEGORIAS = {
  abp: 'ABP',
  fisica: 'Física',
  tactica: 'Táctica',
  finalizacion: 'Finalización',
  posesion: 'Posesión',
};

export const categoriaLabel = (valor) => CATEGORIAS[valor] || valor || 'No definida';
