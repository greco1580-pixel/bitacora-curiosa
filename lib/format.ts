// Formatea números como pesos argentinos: $ XX.XXX (sin decimales)
export function formatoARS(valor: number): string {
  const entero = Math.round(valor);
  const conPuntos = entero.toLocaleString("es-AR");
  return `$ ${conPuntos}`;
}
