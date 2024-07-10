export type Steps = { id: number; title: string; subTitle: string };

export type StepObject = {
  id: number;
  complete: boolean;
  active: boolean;
};

export type ExternalUserType = {
  id: string;
  staff_id?: string;
  acc_id: string;
  firstName: string;
  lastName: string;
  phone: string;
  documentID?: string;
  email: string;
  image?: string;
  com_name: string;
  com_image?: string;
  order?: number;
}

export type DocumentType = {
  id: string
  db_id: string
  fileName: string
  file_path: string
  instructions: any
  responsibles: any[]
}

export type RecipientsType = 'individual' | 'massive' | 'directory'

export type NotificationType = {
  email: boolean
  sms: boolean
  whatsapp: boolean
}

export type WizardStore = {
  steps: StepObject;
  recipientsType: RecipientsType;
  individualList: ExternalUserType[];
  massiveList: ExternalUserType[];
  directoryList: ExternalUserType[];
  newExternalUser: ExternalUserType;
  isEditingNewExternalUser: boolean;
  documentList: DocumentType[];
  currentEditDocument: DocumentType | null;
  isInEdition: boolean;
  notification: NotificationType;
  deadline: Date
  description: string;
  setRecipientsType: (type: RecipientsType) => void;
  setStepComplete: (id: number, complete: boolean, active: boolean) => void;
  setIsEditingNewExternalUser: (flag: boolean) => void;
  searchExternalUserByEmail: (email: string) => void;
  updateNewExternalUser: (field: string, value: any) => void,
  addNewExternalUserInIndividualList: (afterAction?: ()=>void) => void,
  processMassiveFile: (file: File) => void
  addItemInDirectoryList: (item: ExternalUserType) => void
  updateOrderInIndividualList: (newOrder: number, id: string) => void
  updateOrderInMassiveList: (newOrder: number, id: string) => void
  updateOrderInDirectoryList: (newOrder: number, id: string) => void
  removeItemOfIndividualList: (id: string) => void
  removeItemOfMassiveList: (id: string) => void
  removeItemOfDirectoryList: (id: string) => void
  uploadDocuments: (documents: FileList) => void
  removeDocument: (id: string) => void
  editDocument: (id: string) => void
  updateInstructions: (id: string, instructions: any) => void
  updateResponsibles: (id: string, responsibles: any) =>void
  finishEdition: () => void
  changeEmailNotification: () => void
  changeSMSNotification: () => void
  changeWhatsappNotification: () => void
  updateDeadline: (newDeadline: Date) => void
  sendWorkflow: (com_image: string, afterAction: ()=>void) => void
  updateDescription: (description: string) => void
  refreshStore: () => void
};
