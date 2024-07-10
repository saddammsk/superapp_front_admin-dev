import EmailIcon from "@/app/components/icons/email";
import MessageIcon from "@/app/components/icons/message";
import WhatsappIcon from "@/app/components/icons/whatsapp";
import { useState } from "react";
import { useWizard } from "../../../repository/store/wizard";

const NotificationMenu = () => {

  const { notification, changeEmailNotification, changeSMSNotification, changeWhatsappNotification } = useWizard((state) => ({
    notification: state.notification,
    changeEmailNotification: state.changeEmailNotification,
    changeSMSNotification: state.changeSMSNotification,
    changeWhatsappNotification: state.changeWhatsappNotification
  }));

  const [active, setActive] = useState([
    {
      id: 1,
      active: true,
    },
    { id: 2, active: false },
    { id: 3, active: true },
  ]);

  const handleActiveNotification = (id: number) => {
    setActive((prevActive) =>
      prevActive.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="flex gap-4 items-center">
      <div
        onClick={() => changeEmailNotification()}
        className={`${
          notification.email
            ? "bg-green-2000 text-white"
            : null
        } border border-gray-300 text-center rounded-md px-4 py-2 w-64 flex items-center justify-center gap-4 cursor-pointer`}
      >
        <EmailIcon className="w-6 h-6" /> Email
      </div>
      <div
        onClick={() => changeSMSNotification()}
        className={`${
          notification.sms
            ? "bg-green-2000 text-white"
            : null
        }  border border-gray-300 text-center rounded-md px-4 py-2 w-64 flex items-center justify-center gap-4 cursor-pointer`}
      >
        <MessageIcon className="w-6 h-6" /> SMS
      </div>
      <div
        onClick={() => changeWhatsappNotification()}
        className={`${
          notification.whatsapp
            ? "bg-green-2000 text-white"
            : null
        } border border-gray-300 text-center rounded-md px-4 py-2 w-64 flex items-center justify-center gap-4 cursor-pointer`}
      >
        <WhatsappIcon className="w-6 h-6" /> Whatsapp
      </div>
    </div>
  );
};

export default NotificationMenu;
