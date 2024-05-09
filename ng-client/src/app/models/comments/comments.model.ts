import { IComments } from "src/app/interfaces/comments";

export class Comments implements IComments {
    id: number;
    comment_author: string; 
    picture_avatar?: string; 
    createdAt: string; 
    content: string; 
    postId: number; 
  
    constructor(
      id: number,
      comment_author: string,
      createdAt: string,
      content: string,
      postId: number,
      picture_avatar?: string 
    ) {
      this.id = id;
      this.comment_author = comment_author;
      this.createdAt = createdAt;
      this.content = content;
      this.postId = postId;
      this.picture_avatar = picture_avatar; 
    }
  
  }