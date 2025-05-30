export interface JwtPayload {
  _id: string; // Identificador único del usuario (puedes usar "userId" si lo prefieres)
  email: string; // Email del usuario
  iat?: number; // Opcional: Fecha de emisión
  exp?: number; // Opcional: Fecha de expiración
}
