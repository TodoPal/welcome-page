import { jwtDecode } from 'jwt-decode';

export function getJwtExpiration(token: string): number | undefined {
  try {
    return jwtDecode(token)?.exp;
  } catch (error) {
    return undefined;
  }
}