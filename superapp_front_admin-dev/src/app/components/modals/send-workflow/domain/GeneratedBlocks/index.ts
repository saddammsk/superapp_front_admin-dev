export interface Responsible {
  acc_id: string;
  staff_id: string;
  email: string;
  firstName: string;
  lastName: string;
  com_name: string;
  com_image: string;
  image: string;
  rol: string;
}

interface Reviewers extends Responsible {}

export type GeneratedBlocks = {
  id: string;
  type: string;
  responsibles: Responsible[];
  reviewers: Reviewers[];
};
