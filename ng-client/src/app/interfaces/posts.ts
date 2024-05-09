import { ICategories } from './categories';
import { IComments } from './comments';

export interface IPosts {
  id?: number;
  author?: string;
  content?: string;
  thumbnail?: string;
  createdAt?: string;
  title?: string;
  picture_author_post?: string;
  comments?: IComments[];
  likes?: number;
  dislikes?: number;
  categories?: ICategories[];
}
