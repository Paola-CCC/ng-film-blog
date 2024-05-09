import { Comments } from "../comments/comments.model";
import { Categories } from "../categories/categories.model";
import { IPosts } from "src/app/interfaces/posts";

export class Posts implements IPosts {
    id?: number;
    author?: string;
    content?: string;
    thumbnail?: string;
    createdAt?: string;
    title?: string;
    picture_author_post?: string;
    comments: Comments[];
    likes?: number;
    dislikes?: number;
    categories?: Categories[];
  
    constructor(
      id?: number,
      author?: string,
      content?: string,
      thumbnail?: string,
      createdAt?: string,
      title?: string,
      picture_author_post?: string,
      comments: Comments[] =[],
      likes?: number,
      dislikes?: number,
      categories: Categories[] = []
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
  