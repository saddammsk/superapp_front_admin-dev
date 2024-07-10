import { Responsible } from "../GeneratedBlocks";
interface Recipients extends Responsible {
  order: string;
  phone: string;
}
export interface GenerateRecipients {
  recipients: Recipients[];
}
