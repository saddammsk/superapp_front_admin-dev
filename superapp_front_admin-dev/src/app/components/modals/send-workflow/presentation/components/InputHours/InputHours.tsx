import { FC } from "react";

const InputHours: FC<{
  deadlineHour: any;
  setDeadlineHour: (value: any) => void;
}> = ({ deadlineHour, setDeadlineHour }) => {
  return (
    <div className="w-1/2 flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg">
      <div className="flex items-center justify-center w-1/2">
        <label
          htmlFor="deadline-hour"
          className="uppercase flex items-center align-middle text-md font-bold text-gray-400 dark:text-white"
        >
          Horas
        </label>
      </div>
      <div className="flex-1 w-1/2">
        <input
          id="deadline-hour"
          type="number"
          min="1"
          step="1"
          className="border-none bg-transparent rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          value={deadlineHour}
          onChange={(e) =>
            setDeadlineHour(e.target.value ? parseInt(e.target.value) : 0)
          }
        />
      </div>
    </div>
  );
};
export default InputHours;
