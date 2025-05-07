export interface AuthUser {
  id: string;
  firstName: string;
  email: string;
  token: string;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  password: string;
}

export interface JwtResponse {
  id: string;
}

export interface UnauthorizedExceptionResponse {
  statusCode: number;
  message: string;
  redirectUri: string;
}
