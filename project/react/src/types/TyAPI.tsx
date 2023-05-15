// Page Alert
export type TAlert = {
  severity: string | null,
  message: string | null,
};


// slideshow
export type TSlideshow = {
  title: string | null,
  text: string | null,
  background: string | null,
  link_to: string | null,
};


// tagsTop
export type TTagsTop = string;


// ghostTop
export type TGhostTop = {
  slug: string,
  name: string,
  level: number,
};


// equipmentTop
export type TEquipmentTop = {
  name: string,
  item: [
    {
      slug: string,
      name: string,
      image1: string | null,
    }
  ]
};


// curseItemTop
export type TCurseItemTop = {
  slug: string,
  name: string,
  image1: string | null,
};


// evidenceTop
export type TEvidenceTop = {
  slug: string,
  name: string,
};


// mapTop
export type TMapTop = {
  slug: string,
  name: string,
  name_en: string,
  mapsize: string,
  number: number,
  building: string,
  image1: string | null,
  image2: string | null,
};


// postTop
export type TPostTop = {
  slug: string;
  tags: Array<string>;
  commentSum: number;
  favoriteSum: number;
  display: string | null;
  icon: string | null;
  text: string | null;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  created_at: string;
  user: string | null;
  edit: boolean;
  favorited: boolean;
};


// articleTop
export type TArticleTop = {
  slug: string;
  tags: Array<string>;
  favoriteSum: number;
  title: string;
  subtitle: string | null;
  image1: string | null;
  created_at: string;
  user: string;
  version: string | null;
  edit: boolean;
  display: string;
  icon: string;
  favorited: boolean;
};


