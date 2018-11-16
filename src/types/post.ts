export default interface IPost {
  username: string;
  userImage: string;
  postImage: string;
  likes: number;
  hasBeenLiked: boolean;
  caption: string;
  filter: string;
}
