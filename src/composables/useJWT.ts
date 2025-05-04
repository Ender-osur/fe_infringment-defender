

export function decodeToken(token: string) {
  try {
    // El token JWT tiene tres partes separadas por puntos: header.payload.signature
    // Nos interesa el payload, que es la segunda parte
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}
