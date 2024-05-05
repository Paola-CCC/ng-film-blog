import { IAuth, IUser } from "src/app/_interfaces/auth.model";

export class User implements IAuth {

    public status: number;
    public user: IUser[]; 
    public jwt : string

    constructor(status: number, user :any, jwt : string) {
        this.status = status;
        this.user = user;
        this.jwt = jwt;
      }
}
