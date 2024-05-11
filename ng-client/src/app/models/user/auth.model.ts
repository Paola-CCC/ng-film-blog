import { IAuth } from "@interfaces";
import { User } from "./user.model";


export class Auth implements IAuth {
  user?: User;
  jwt: string;

  constructor(user?: User, jwt: string = '') {
    this.user = user;
    this.jwt = jwt;
  }
}
