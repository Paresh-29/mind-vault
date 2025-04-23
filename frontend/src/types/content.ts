export interface Tag {
  _id: string;
  title: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "article";
  tags?: Tag[];
  createdAt: string;
}
