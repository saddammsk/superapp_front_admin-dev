import { Generated } from "../../domain/Generated";

export const generatedData = ({
  user,
  name,
  workflow,
  deadlineDay,
  deadlineHour,
  gBlocks,
  gRecipients,
  description
}: Generated) => {
  const generated = {
    acc_id: user.acc_id,
    emitter_id: user.staff_id,
    com_name: user.com_name,
    com_image: user.com_image,
    workflow_id: workflow,
    deadline: deadlineDay * 24 + deadlineHour,
    emission_name: name,
    blocks: gBlocks,
    recipients: gRecipients,
    description: description
  };

  return generated;
};
