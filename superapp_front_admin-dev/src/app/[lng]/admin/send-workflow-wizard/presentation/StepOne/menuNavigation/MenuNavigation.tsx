import { FC } from "react";

import { RecipientsType } from "../../../domain/wizard";

const MenuNavigation: FC<{
  active: RecipientsType;
  setActive: (type: RecipientsType) => void;
}> = ({ active, setActive }) => {
  return (
    <>
      <nav className="flex justify-center items-center">
        <div
          onClick={() => setActive('individual')}
          className={`py-2 w-full flex justify-center items-center border-b-2 ${
            active === 'individual' ? "border-green-2000" : "border-gray-200 cursor-pointer"
          }`}
        >
          <h5>Individual</h5>
        </div>
        <div
          onClick={() => setActive('massive')}
          className={`py-2 w-full flex justify-center items-center border-b-2 ${
            active === 'massive' ? "border-green-2000" : "border-gray-200 cursor-pointer"
          }`}
        >
          <h5>Masivo</h5>
        </div>
        <div
          onClick={() => setActive('directory')}
          className={`py-2 w-full flex justify-center items-center border-b-2 ${
            active === 'directory' ? "border-green-2000" : "border-gray-200 cursor-pointer"
          }`}
        >
          <h5>Directorio</h5>
        </div>
      </nav>
    </>
  );
};
export default MenuNavigation;
