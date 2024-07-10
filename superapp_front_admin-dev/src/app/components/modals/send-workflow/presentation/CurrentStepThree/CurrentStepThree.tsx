import { Button } from "flowbite-react";
import { FC } from "react";

const CurrentStepThree: FC<{
  hideModal: () => void;
  setCurrentStep: any;
  sendWorflow: any;
}> = ({ hideModal, setCurrentStep, sendWorflow }) => {
  return (
    <>
      <div className="flex justify-start">
        <Button
          onClick={hideModal}
          className="w-2/5 mr-2 capitalize text-white inline-flex items-center bg-gray-15000 hover:bg-gray-14000 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => setCurrentStep(2)}
          className="w-2/5 capitalize text-white inline-flex items-center bg-green-2000 hover:bg-green-1000 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Anterior
        </Button>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={sendWorflow}
          className="w-2/5 capitalize text-white inline-flex items-center bg-purple-700 hover:bg-purple-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Enviar Flujo de Trabajo
        </Button>
      </div>
    </>
  );
};

export default CurrentStepThree;
