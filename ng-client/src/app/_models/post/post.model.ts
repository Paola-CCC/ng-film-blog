import { IComments } from "../comments/comments.model";

export interface IPosts {
    id:number,
    author: string;
    comments: IComments[],
    createdAt : string,
    title: string;
}
