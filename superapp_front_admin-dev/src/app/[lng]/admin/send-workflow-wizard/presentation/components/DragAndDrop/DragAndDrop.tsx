import { FC, useState } from "react";
//@ts-ignore
import Files from 'react-files'
import { toast } from "react-toastify";

const DragAndDrop: FC<{handleUpload: (e: FileList) => void}> = ({
  handleUpload
}) => {

  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    if(dragOver === false){
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    if(dragOver === true){
      setDragOver(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Files
        className='files-dropzone w-full '
        onError={(error: any, file: any) => toast.error(error.message)}
        onChange={(e: FileList)=>{
          handleUpload(e)
          setDragOver(false)
        }}
        accepts={['.pdf']}
        multiple
        clickable>
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${dragOver?'bg-gray-100':'bg-gray-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click para subir</span> o arrastra aqui
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PDF (MAX. 10MB)
          </p>
        </div>
      </label>
      </Files>
    </div>
  );
};

export default DragAndDrop;
