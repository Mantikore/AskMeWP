export interface WpPost {
  id: number;
  date: string;
  title: {
    rendered: string
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  categories: number[];
  [props: string]: any;
}
