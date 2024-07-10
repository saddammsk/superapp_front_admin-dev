import { GenerateRecipients } from "../../domain/GenerateRecipients";

export const generateRecipients = ({
  groups,
}: {
  groups: GenerateRecipients[];
}) => {

  let generated: any[] = []

  groups.map((item) => {
    if(item.recipients.length !== 0){
      generated.push(
        {
          group: item.recipients.map((element) => {
            return {
              acc_id: element.acc_id,
              staff_id: element.staff_id,
              email: element.email,
              firstName: element.firstName,
              lastName: element.lastName,
              com_name: element.com_name,
              com_image: element.com_image || "/img/default-avatar.jpg",
              image: element.image || "/img/default-avatar.jpg",
              order: Number(element.order),
              rol: "signer",
              phone: element.phone,
            };
          }),
        }
      )
    }
  });

  return generated;
};
