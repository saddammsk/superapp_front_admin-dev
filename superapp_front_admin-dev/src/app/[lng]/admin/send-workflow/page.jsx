'use client'; // This is a client component 👈🏽

import { useState } from "react";
import { SendTemplateWorkflow } from "@/app/components/modals/send-workflow/SendTemplateWorkflow";

const SendWorkflow = ({ params: { lng } }) => {
  
  const [showModal, setShowModal] = useState(true);

  return <SendTemplateWorkflow 
    lng={lng}
    showModal={showModal}  
    hideModal={()=>setShowModal(false)}/>
};

export default SendWorkflow;
