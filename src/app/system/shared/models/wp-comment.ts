export interface WpComment {
  id: number;
  date: string;
  author_name: string;
  author: number;
  content: {
    rendered: string
  };
  author_avatar_urls: {
    [size: number]: string;
  };
  [props: string]: any;
}
