
export interface IUser {
    id: any;
    username: string;
    email: string;
    password: string;
    createdAt : string;
    role_name : string;
}


export interface IAuth {
    status: any;
    user : IUser[];
    jwt : string;
}