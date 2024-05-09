export interface IComments {
  id: number;
  comment_author: string;
  picture_avatar?: string;
  createdAt: string;
  content: string;
  postId: number;
}

export interface ICommentsSent {
  content: string;
  postId: number;
  userId: number;
}