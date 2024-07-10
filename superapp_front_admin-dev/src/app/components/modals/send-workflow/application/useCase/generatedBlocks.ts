import { GeneratedBlocks } from "../../domain/GeneratedBlocks";

export const generatedBlocks = ({ blocks }: { blocks: GeneratedBlocks[] }) => {
  const generatedBlocksObj = blocks.map((item) => {
    return {
      block_id: item.id,
      block_type: item.type,
      responsible: item.responsibles.map((element, index) => {
        return {
          acc_id: element.acc_id,
          staff_id: element.staff_id,
          email: element.email,
          firstName: element.firstName,
          lastName: element.lastName,
          com_name: element.com_name,
          com_image: element.com_image || "/img/default-avatar.jpg",
          image: element.image || "/img/default-avatar.jpg",
          order: index + 1,
          rol: element.rol,
        };
      }),
      reviewers: item.reviewers.map((element, index) => {
        return {
          acc_id: element.acc_id,
          staff_id: element.staff_id,
          email: element.email,
          firstName: element.firstName,
          lastName: element.lastName,
          com_name: element.com_name,
          com_image: element.com_image || "/img/default-avatar.jpg",
          image: element.image || "/img/default-avatar.jpg",
          order: index + 1,
          rol: element.rol,
        };
      }),
    };
  });
  return generatedBlocksObj;
};
