export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  role_name?: string;
  profilePicture?: string;
}

export interface IAuth {
  user?: IUser;
  jwt?: string;
}

export interface IUserProfile {
  id: number,
  username: string ,
  email: string,
  role_name:  string,
  profilePicture: string | null,
  userImageId: number | null
};