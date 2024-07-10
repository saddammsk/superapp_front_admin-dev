import { FC } from "react";
import { Directorio } from "../../components/Directorio";
import { Individual } from "../../components/Individual";
import { Masivo } from "../../components/Masivo";
import { RecipientsType } from "../../../domain/wizard";

export const BodyNavigation: FC<{
  active: RecipientsType;
}> = ({ active }) => {
  return (
    <>
      <div className="w-full h-full flex justify-center">
        {active === 'individual' && <Individual />}
        {active === 'massive' && <Masivo />}
        {active === 'directory' && <Directorio />}
      </div>
    </>
  );
};
