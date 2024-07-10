import { ReactNode } from "react";

export type RenderBlockSelectableProps = {
  isActive: boolean;
  blockName: string;
  icon: any;
  id: string;
  onClick: () => void;
  addInBlock: () => void;
  removeInBlock: () => void;
};
