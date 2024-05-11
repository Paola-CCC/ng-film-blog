import { IUser } from "@interfaces";

export class User implements IUser {

    id?: number;
    username?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    role_name?: string;
    picture_user?: string;

    public constructor(
        id?: number,
        username?: string,
        email?: string,
        password?: string,
        createdAt?: string,
        role_name?: string,
        picture_user?: string
    ) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.role_name = role_name;
        this.picture_user = picture_user;

    }
}