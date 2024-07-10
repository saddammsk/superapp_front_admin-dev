import { Steps } from "../../domain/wizard";
import { SelectStep } from "../selectStep/selectStep";

const Header = () => {
  const steps: Steps[] = [
    { id: 1, title: "Paso 1", subTitle: "Anadir persona" },
    { id: 2, title: "Paso 2", subTitle: "Seleccionar documentos" },
    { id: 3, title: "Paso 3", subTitle: "Notificaciones" },
  ];

  return (
    <>
      <header className="p-4 border-b border-gray ">
        <div className="flex justify-center items-center">
          {steps?.map((step, i) => (
            <SelectStep key={i} step={step} i={i} />
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
