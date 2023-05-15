import { TPostItem } from '../components/parts/item/PostItem';

export type TyModal = {
  post: {
    tags: string[];
    source?: TPostItem;
    open: any;
  };

  image: {
    url: string;
    open: any;
  };
}