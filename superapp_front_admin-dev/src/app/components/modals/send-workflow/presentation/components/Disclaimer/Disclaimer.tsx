import { HelpIcon } from "@/app/components/icons/HelpIcon";
import { FC } from "react";

const Disclaimer: FC<{ title: string; textTooltip: string }> = ({
  title,
  textTooltip,
}) => {
  return (
    <label className="flex items-center align-middle mb-2 text-sm font-semibold text-gray-900 dark:text-white">
      {title}
      <HelpIcon
        className={
          "ml-3 text-green-2000 flex items-center justify-center h-full"
        }
        tooltip={textTooltip}
      />
    </label>
  );
};

export default Disclaimer;
