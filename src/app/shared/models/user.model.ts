export type Role = 'ADMIN' | 'USER';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  token: string;
  role: Role;
  password: string;
}