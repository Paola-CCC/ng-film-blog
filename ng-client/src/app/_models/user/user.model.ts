export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  role_name?: string;
}


export interface IAuth {
  status?: string;
  user: IUser;
  jwt: string;
}