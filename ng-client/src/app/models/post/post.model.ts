import { ICategories } from "src/app/interfaces/categories.interface";
import { IComments } from "src/app/interfaces/comments.interface";
import { IPosts } from "src/app/interfaces/posts.interface";

export class Posts implements IPosts {
    id?: number;
    author?: string;
    content?: string;
    thumbnail?: string;
    createdAt?: string;
    title?: string;
    picture_author_post?: string;
    comments: IComments[];
    likes?: number;
    dislikes?: number;
    categories?: ICategories[];
  
    constructor(
      id?: number,
      author?: string,
      content?: string,
      thumbnail?: string,
      createdAt?: string,
      title?: string,
      picture_author_post?: string,
      comments: IComments[] =[],
      likes?: number,
      dislikes?: number,
      categories: ICategories[] = []
    ) {
      this.id = id;
      this.author = author;
      this.content = content;
      this.thumbnail = thumbnail;
      this.createdAt = createdAt;
      this.title = title;
      this.comments = comments; 
      this.likes = likes; 
      this.dislikes = dislikes; 
      this.categories = categories; 
      this.picture_author_post = picture_author_post;
    }
  
  }
  