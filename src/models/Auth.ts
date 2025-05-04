export interface AuthUser {
  id: number;
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
