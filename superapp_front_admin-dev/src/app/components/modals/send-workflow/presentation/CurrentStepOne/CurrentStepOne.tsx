import { Button } from "flowbite-react";
import { FC } from "react";
import { toast } from "react-toastify";

const CurrentStepOne: FC<{
  hideModal: () => void;
  setCurrentStep: any;
  workflow: any;
}> = ({ hideModal, setCurrentStep, workflow }) => {
  return (
    <>
      <div className="flex justify-start">
        <Button
          onClick={hideModal}
          className="w-2/5 capitalize text-white inline-flex items-center bg-gray-15000 hover:bg-gray-14000 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cancelar
        </Button>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            if (workflow !== "") {
              setCurrentStep(2);
            } else {
              toast.warn("Seleccione un flujo de trabajo antes de continuar");
            }
          }}
          className="w-2/5 capitalize text-white inline-flex items-center bg-green-2000 hover:bg-green-1000 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Siguiente
        </Button>
      </div>
    </>
  );
};

export default CurrentStepOne;
