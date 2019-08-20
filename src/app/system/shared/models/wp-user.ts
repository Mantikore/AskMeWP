export interface WpUser {
  id: number;
  name: string;
  slug: string;
  avatar_urls: {
    [size: string]: string
  };
  [props: string]: any;
}
