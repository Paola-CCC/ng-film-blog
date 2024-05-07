import { IComments } from "../comments/comments.model";

export interface IPosts {
    id:number,
    author: string,
    content: string,
    thumbnail:string,
    createdAt : string,
    title: string,
    picture_author_post?: string,
    comments: IComments[],
    liskes: number,
    dislikes: number
}
