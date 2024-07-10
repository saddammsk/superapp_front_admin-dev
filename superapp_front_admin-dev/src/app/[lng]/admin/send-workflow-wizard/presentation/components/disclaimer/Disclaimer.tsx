import { HelpIcon } from "@/app/components/icons/HelpIcon";
import { FC } from "react";

const Disclaimer: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
    <div className="py-8">
      <h5 className="font-bold flex items-center gap-4">
        {title}
        <HelpIcon className={"text-green-2000 h-full"} tooltip={"..."} />
      </h5>
      <p className="text-15 text-black-3000">{description}</p>
    </div>
  );
};

export default Disclaimer;
