import { GenerateRecipients } from "../GenerateRecipients";
import { GeneratedBlocks } from "../GeneratedBlocks";

export type Generated = {
  user: { acc_id: string; com_name: string, com_image: string, staff_id: string};
  name: string;
  workflow: string;
  deadlineDay: number;
  deadlineHour: number;
  gBlocks: GeneratedBlocks;
  gRecipients: GenerateRecipients;
  description: string
};
