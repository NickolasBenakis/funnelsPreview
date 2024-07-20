export type FunnelJSON = {
  name: string;
  bgColor: string;
  pages: FunnelPage[];
};

export type FunnelPage = {
  id: string;
  blocks: Block[];
};

export type Block = Text | Image | List | Button;

type BaseBlock = {
  id: string;
  type: "text" | "image" | "list" | "button";
};

type Text = BaseBlock & {
  type: "text";
  text: string;
  align?: "left" | "center" | "right";
  color?: string;
};

type Image = BaseBlock & {
  type: "image";
  src: string;
  alt?: string;
};

type Button = BaseBlock & {
  type: "button";
  text: string;
  bgColor: string;
  color: string;
};

type List = BaseBlock & {
  type: "list";
  items: ListItem[];
};

type ListItem = {
  id: string;
  title: string;
  description: string;
  src: string;
};
