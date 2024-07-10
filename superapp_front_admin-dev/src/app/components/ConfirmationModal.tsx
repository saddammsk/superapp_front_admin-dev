// Modal.js
import { Modal, Button } from 'flowbite-react';

interface props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => any;
  mnsj: string;
  title: 'Aprobar' | 'Rechazar' | 'Eliminar';
  isLoading?: boolean;
}

const ConfirmationModal = ({ isOpen, onClose, onSubmit, mnsj, title, isLoading }: props) => {
  return (
    <Modal
      show={isOpen}
      size="md"
      popup={true}
      onClose={onClose}
    >
      <div className="p-6 text-center">
        <div className="mb-4">
          {title==='Aprobar' ?
            <svg
            className="w-20 h-20 mx-auto text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          : (title==='Rechazar') ?
          <svg
            className="w-20 h-20 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.38 8.38 0 01-3.8-1 8.5 8.5 0 117.6 0 8.38 8.38 0 01-3.8 1z"
            ></path>
          </svg>:
          <svg
          className="w-16 h-16 mx-auto text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.29 3.86l-6 10.39A1.25 1.25 0 005.25 16h13.5a1.25 1.25 0 001.07-1.75l-6-10.39a1.25 1.25 0 00-2.14 0zM12 9v4m0 4h.01"
          />
        </svg>
        }
        </div>
        <h2 className={`text-xl font-bold mb-2 ${title==='Aprobar' ? 'text-green-500' : 'text-red-500'}`}>{title}</h2>
        <p className="mb-6 text-gray-500">{mnsj}</p>
        {isLoading ? (
          <div className='flex justify-center  items-center h-14'>
            <div className='bg-green-500 h-10 w-36 rounded flex justify-center items-center'>
              <i className ="fa-solid fa-spinner animate-spin text-white"></i>
            </div>
          </div>
        ): (
          <div className="flex justify-center space-x-4">
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
            <Button className={`text-white text-lg ${title==='Aprobar' ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => {
              onSubmit()
              onClose()
              }
              }>
              Confirmar
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
