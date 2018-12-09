export interface LibroInterface {
  ISBN: string;
  editorial: string;
  edicion?: string;
  titulo?: string;
  autor?: string;
  genero?: string;
  ejemplares?: number;
  prestados?: number;
  ejemplaresDisponibles?: number;
}
