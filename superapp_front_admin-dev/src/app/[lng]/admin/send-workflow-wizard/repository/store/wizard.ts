import { createWithEqualityFn } from "zustand/traditional";
import {
  DocumentType,
  ExternalUserType,
  NotificationType,
  RecipientsType,
  StepObject,
  WizardStore,
} from "../../domain/wizard";
import { shallow } from "zustand/shallow";
import { getDecodedToken } from "@/utils/utils";
import axios from "axios";
import { getPersonalInfoByEmail } from "@/services/UsersService";
import { post } from "@/services/RestService";
import { UploadFile } from "@/services/FileManagerService";
import { sendManuallyWorkflow } from "@/services/WorkflowService";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/UserStore";

const initialSteps: StepObject = { id: 1, complete: false, active: true };
const initialRecipientsType: RecipientsType = "individual";
const initialIndividualList: ExternalUserType[] = [];
const initialMassiveList: ExternalUserType[] = [];
const initialDirectoryList: ExternalUserType[] = [];
const initialNewExternalUser: ExternalUserType = {
  id: "1",
  acc_id: "",
  firstName: "",
  lastName: "",
  phone: "",
  documentID: "",
  email: "",
  image: "/img/default-avatar.jpg",
  com_name: "",
  com_image: "/img/default-avatar.jpg",
};
const initialIsEditingNewExternalUser = false;
const initialDocumentList: DocumentType[] = [];
const initialNotification: NotificationType = {
  email: true,
  sms: false,
  whatsapp: true,
};
const initialDeadline: Date = new Date();
const initialDescription: string = "";

const decodedToken = getDecodedToken();

function generateUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useWizard = createWithEqualityFn<WizardStore>()(
  (set) => ({
    steps: initialSteps,
    recipientsType: initialRecipientsType,
    individualList: initialIndividualList,
    massiveList: initialMassiveList,
    directoryList: initialDirectoryList,
    newExternalUser: initialNewExternalUser,
    isEditingNewExternalUser: initialIsEditingNewExternalUser,
    documentList: initialDocumentList,
    currentEditDocument: null,
    isInEdition: false,
    notification: initialNotification,
    deadline: initialDeadline,
    description: initialDescription,
    setRecipientsType: (type: RecipientsType) => {
      return set(() => {
        return { recipientsType: type };
      });
    },
    setStepComplete: (id: number, complete: boolean, active: boolean) => {
      return set(() => {
        return { steps: { id, complete, active } };
      });
    },
    setIsEditingNewExternalUser: (flag: boolean) => {
      return set(() => {
        return { isEditingNewExternalUser: flag };
      });
    },
    searchExternalUserByEmail: (email: string) => {
      getPersonalInfoByEmail(email)
        .then((response) => {
          set(() => {
            return {
              newExternalUser: response.data.data,
              isEditingNewExternalUser: true,
            };
          });
        })
        .catch((e) => {
          set(() => {
            return {
              newExternalUser: { ...initialNewExternalUser, email: email },
              isEditingNewExternalUser: true,
            };
          });
        });
    },
    updateNewExternalUser: (field: string, value: any) => {
      return set((state: WizardStore) => {
        let _newExternalUser = { ...state.newExternalUser };
        //@ts-ignore
        _newExternalUser[field] = value;
        return { newExternalUser: _newExternalUser };
      });
    },
    addNewExternalUserInIndividualList: (afterAction?: () => void) => {
      return set((state: WizardStore) => {
        let currentList = [...state.individualList];
        if (state.newExternalUser.staff_id) {
          currentList.push({
            ...state.newExternalUser,
            order: currentList.length + 1,
            id: generateUID(),
          });
          if (afterAction) afterAction();
          return {
            individualList: currentList,
            isEditingNewExternalUser: false,
          };
        } else {
          //Save in the database
          post(`:40004/admin/v1/directory`, {
            acc_id: decodedToken.acc_id,
            name: state.newExternalUser.firstName,
            lastName: state.newExternalUser.lastName,
            email: state.newExternalUser.email,
            workingCompany: state.newExternalUser.com_name,
            phone: state.newExternalUser.phone,
            documentID: state.newExternalUser.documentID,
          }).then((response) => {
            let data = response.data.data;
            if (afterAction) afterAction();
            set(() => {
              currentList.push({
                ...initialNewExternalUser,
                id: generateUID(),
                order: currentList.length + 1,
                acc_id: data.acc_id,
                firstName: data.name,
                lastName: data.lastName,
                phone: data.phone,
                documentID: data.documentID,
                staff_id: data.staff_id_subscriber,
                email: data.email,
                com_name: data.workingCompany,
              });
              return {
                individualList: currentList,
                isEditingNewExternalUser: false,
              };
            });
          });
          return {};
        }
      });
    },
    processMassiveFile: (file: File) => {
      let formData = new FormData();
      formData.append("file", file);
      const accId = decodedToken.acc_id;
      axios
        .post(
          `https://super.xertify.co:40004/admin/v1/directory/uploadFile/${accId}`,
          formData
        )
        .then((response) => {
          let _users = response.data.data.info_Staffs.map(
            (item: any, index: number) => {
              return { ...item, order: index + 1, id: generateUID() };
            }
          );
          set(() => {
            return { massiveList: _users };
          });
        });
    },
    addItemInDirectoryList: (item: ExternalUserType) => {
      set((state: WizardStore) => {
        let _directoryList = [...state.directoryList];
        _directoryList.push({
          ...item,
          order: _directoryList.length + 1,
          id: generateUID(),
        });
        return { directoryList: _directoryList };
      });
    },
    updateOrderInIndividualList: (newOrder: number, id: string) => {
      set((state: WizardStore) => {
        let _individualList = [...state.individualList];
        let index = _individualList.findIndex((item) => item.id === id);
        _individualList[index] = { ..._individualList[index], order: newOrder };
        return { individualList: _individualList };
      });
    },
    updateOrderInMassiveList: (newOrder: number, id: string) => {
      set((state: WizardStore) => {
        let _massiveList = [...state.massiveList];
        let index = _massiveList.findIndex((item) => item.id === id);
        _massiveList[index] = { ..._massiveList[index], order: newOrder };
        return { massiveList: _massiveList };
      });
    },
    updateOrderInDirectoryList: (newOrder: number, id: string) => {
      set((state: WizardStore) => {
        let _directoryList = [...state.directoryList];
        let index = _directoryList.findIndex((item) => item.id === id);
        _directoryList[index] = { ..._directoryList[index], order: newOrder };
        return { directoryList: _directoryList };
      });
    },
    removeItemOfIndividualList: (id: string) => {
      set((state: WizardStore) => {
        let _individualList = [...state.individualList];
        _individualList = _individualList.filter((item) => item.id !== id);
        return { individualList: _individualList };
      });
    },
    removeItemOfMassiveList: (id: string) => {
      set((state: WizardStore) => {
        let _massiveList = [...state.massiveList];
        _massiveList = _massiveList.filter((item) => item.id !== id);
        return { massiveList: _massiveList };
      });
    },
    removeItemOfDirectoryList: (id: string) => {
      set((state: WizardStore) => {
        let _directoryList = [...state.directoryList];
        _directoryList = _directoryList.filter((item) => item.id !== id);
        return { directoryList: _directoryList };
      });
    },
    uploadDocuments: async (documents: FileList) => {
      console.log("Uploading")
      let uploadedListDocument: DocumentType[] = [];
      for (let index = 0; index < documents.length; index++) {
        let document = documents[index];
        let { data } = await UploadFile(
          document,
          "ramPrueba/sub/2",
          decodedToken.staff_id,
          "Workflow Document"
        );
        uploadedListDocument.push({
          id: generateUID(),
          db_id: data.data.id,
          file_path: data.data.file_path,
          fileName: data.data.fileName,
          instructions: [],
          responsibles: [],
        });
      }
      set((state: WizardStore) => {
        return {
          documentList: [...state.documentList, ...uploadedListDocument],
        };
      });
    },
    removeDocument: (id: string) => {
      set((state: WizardStore) => {
        let _documentList = [...state.documentList];
        _documentList = _documentList.filter((item) => item.id !== id);
        return { documentList: _documentList };
      });
    },
    editDocument: (id: string) => {
      set((state: WizardStore) => {
        let _currentEditDocument = [...state.documentList].find(
          (item) => item.id === id
        );
        return { currentEditDocument: _currentEditDocument, isInEdition: true };
      });
    },
    updateInstructions: (id: string, instructions: any) => {
      set((state: WizardStore) => {
        let _documentList = [...state.documentList];
        let index = _documentList.findIndex((item) => item.id === id);
        _documentList[index] = {
          ..._documentList[index],
          instructions: instructions,
        };
        return {
          documentList: _documentList,
          currentEditDocument: _documentList[index],
          isInEdition: true,
        };
      });
    },
    updateResponsibles: (id: string, responsibles: any) => {
      set((state: WizardStore) => {
        let _documentList = [...state.documentList];
        let index = _documentList.findIndex((item) => item.id === id);
        _documentList[index] = {
          ..._documentList[index],
          responsibles: responsibles,
        };
        console.log("EDITANDO RESPONSABLES", _documentList[index]);
        return {
          documentList: _documentList,
          //currentEditDocument: { ..._documentList[index] },
          //isInEdition: true,
        };
      });
    },
    finishEdition: () => {
      set(() => {
        return { isInEdition: false, currentEditDocument: null };
      });
    },
    changeEmailNotification: () => {
      set((state: WizardStore) => {
        return {
          notification: {
            ...state.notification,
            email: !state.notification.email,
          },
        };
      });
    },
    changeSMSNotification: () => {
      set((state: WizardStore) => {
        return {
          notification: { ...state.notification, sms: !state.notification.sms },
        };
      });
    },
    changeWhatsappNotification: () => {
      set((state: WizardStore) => {
        return {
          notification: {
            ...state.notification,
            whatsapp: !state.notification.whatsapp,
          },
        };
      });
    },
    updateDeadline: (newDeadline: Date) => {
      set(() => {
        return { deadline: newDeadline };
      });
    },
    sendWorkflow: (com_image: string, afterAction: () => void) => {
      set((state: WizardStore) => {
        
        const deadlineUnix = Math.floor(state.deadline.getTime() / 1000);
        let recipients: any = [];
        if (state.recipientsType === "individual") {
          recipients = state.individualList.map((item) => {
            return {
              acc_id: item.acc_id,
              staff_id: item.staff_id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              com_name: item.com_name,
              com_image: item.com_image || "/img/default-avatar.jpg",
              image: item.image || "/img/default-avatar.jpg",
              order: 1,
              phone: item.phone,
              rol: "signer",
            };
          });
        }
        if (state.recipientsType === "massive") {
          recipients = state.massiveList.map((item) => {
            return {
              acc_id: item.acc_id,
              staff_id: item.staff_id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              com_name: item.com_name,
              com_image: item.com_image,
              image: item.image,
              order: 1,
              phone: item.phone,
              rol: "signer",
            };
          });
        }
        if (state.recipientsType === "directory") {
          recipients = state.directoryList.map((item) => {
            return {
              acc_id: item.acc_id,
              staff_id: item.staff_id,
              email: item.email,
              firstName: item.firstName,
              lastName: item.lastName,
              com_name: item.com_name,
              com_image: item.com_image,
              image: item.image,
              order: 1,
              phone: item.phone,
              rol: "signer",
            };
          });
        }

        let blocks = [];

        blocks = state.documentList.map((item, index) => {
          const lastDotPosition = item.fileName.lastIndexOf('.');
          let label = "";
          if(lastDotPosition === -1){
            label = item.fileName
          } else {
            label = item.fileName.substring(0, lastDotPosition);
          }
          return {
            block_label: label,
            block_type: "document",
            template_id: item.db_id,
            template_aws_path: item.file_path,
            file_type: "application/pdf",
            block_key: `doc_${index + 1}`,
            order: index + 1,
            responsible: item.responsibles.map((responsible: any) => {
              return {
                ...responsible,
                order: responsible.order? responsible.order : 1,
                image: responsible.image || "/img/default-avatar.jpg",
                rol: 'approver'
              }
            }),
            reviewers: [],
            instructions: item.instructions,
          };
        });

        let body = {
          acc_id: decodedToken.acc_id,
          com_name: decodedToken.com_name,
          com_image: com_image,
          emitter_id: decodedToken.staff_id,
          deadline: deadlineUnix,
          emission_name: `emision-individual_${deadlineUnix}`,
          blocks: blocks,
          recipients: recipients,
          //description: state.description
        };

        sendManuallyWorkflow(body)
          .then((response) => {
            if (response.data.success) {
              toast.success(`Operación satisfactoria`);
              if (afterAction) afterAction();
            } else {
              toast.error("Ocurrio un error");
            }
          })
          .catch((error) => {
            toast.error("Ocurrio un error");
          });
        return {};
      });
    },
    updateDescription: (description: string) => {
      set(() => {
        return { description: description };
      });
    },
    refreshStore: () => {
      set(() => {
        return {
          steps: initialSteps,
          recipientsType: initialRecipientsType,
          individualList: initialIndividualList,
          massiveList: initialMassiveList,
          directoryList: initialDirectoryList,
          newExternalUser: initialNewExternalUser,
          isEditingNewExternalUser: initialIsEditingNewExternalUser,
          documentList: initialDocumentList,
          currentEditDocument: null,
          isInEdition: false,
          notification: initialNotification,
          deadline: initialDeadline,
          description: initialDescription,
        };
      });
    },
  }),
  shallow
);
