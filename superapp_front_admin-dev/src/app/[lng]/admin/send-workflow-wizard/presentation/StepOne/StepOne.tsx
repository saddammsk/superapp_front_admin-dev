"use client";
import { Disclaimer } from "../components/disclaimer";
import { MenuNavigation } from "./menuNavigation";
import { BodyNavigation } from "./BodyNavigation";
import { useWizard } from "../../repository/store/wizard";

const StepOne = () => {

  const { recipientsType, setRecipientsType } = useWizard((state) => ({
    recipientsType: state.recipientsType,
    setRecipientsType: state.setRecipientsType
  }));

  return (
    <>
      <Disclaimer
        title="Añadir personas"
        description="Seleccione el tipo de carga de destinatarios para su flujo"
      />
      <MenuNavigation active={recipientsType} setActive={setRecipientsType} />
      <BodyNavigation active={recipientsType} />
    </>
  );
};

export default StepOne;
