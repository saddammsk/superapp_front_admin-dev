import { FC, useState } from "react";

const DobleDropDown: FC<{
  names: string[];
  charges: string[];
  defaultName?: string;
  defaultCharge?: string;
  order: number;
  setOrder: (order: number) => void;
}> = ({ names, charges, defaultName, defaultCharge, order, setOrder }) => {
  const [name, setName] = useState("");
  const [charge, setCharge] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        id="dropdownUsersButton"
        data-dropdown-toggle="dropdownUsers"
        data-dropdown-placement="right"
        className="px-2 border border-gray-1000 rounded-md w-full"
        type="button"
      >
        <div className="flex rounded-md items-center justify-between px-4">
          <div className="flex  flex-col justify-left items-left">
            <p className="text-left truncate">
              Nombre: {name ? name : defaultName}
            </p>
            <p className="text-left truncate max-w-72">
              Cargo: {charge ? charge : defaultCharge}
            </p>
            <p className="text-left truncate max-w-72">
              Orden: {order ? order : 1}
            </p>
          </div>
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
      </button>

      <div
        id="dropdownUsers"
        className={`z-10 bg-white absolute w-70 rounded-lg border border-gray-200 shadow ${
          open ? null : "hidden"
        }`}
      >
        <div className="flex gap-4 items-center w-[30rem]">
          <ul className="h-48 p-2 overflow-y-auto text-gray-700 divide-y divide-gray-100">
            <li>Nombre</li>
            {names.map((name, index) => {
              return (
                <li key={index}>
                  <div className="flex p-2 rounded hover:bg-gray-100">
                    <div className="flex items-center h-5">
                      <input
                        onChange={() => setName(name)}
                        id={`${name}-n`}
                        name="name"
                        type="radio"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label
                        htmlFor={`${name}-n`}
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>{name}</div>
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="h-48 p-2 overflow-y-auto text-gray-700 divide-y divide-gray-100 w-full">
            <li>Cargo</li>
            {charges.map((charge, index) => {
              return (
                <li key={index}>
                  <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex items-center h-5">
                      <input
                        onChange={() => setCharge(charge)}
                        id={`${charge}-c`}
                        name="charge"
                        type="radio"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                    </div>
                    <div className="ms-2 text-sm">
                      <label
                        htmlFor={`${charge}-c`}
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        <div>{charge}</div>
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="h-48 p-2 overflow-y-auto text-gray-700 divide-y divide-gray-100 w-full">
            <li>Orden</li>
            <li><input
            value={order}
                      type="number"
                      min="0"
                      onChange={(e) => setOrder(Number(e.target.value))}
                      className="ml-2 w-20"
                    /></li>
          </ul>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center w-full bg-green-2000 p-3 text-white border-gray-200 rounded-lg"
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default DobleDropDown;
