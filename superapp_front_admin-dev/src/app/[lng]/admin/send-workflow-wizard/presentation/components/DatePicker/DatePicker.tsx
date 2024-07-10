import DateIcon from "@/app/components/icons/date";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { useWizard } from "../../../repository/store/wizard";
const DatePickerComponent = () => {
  const { deadline, updateDeadline } = useWizard((state) => ({
    deadline: state.deadline,
    updateDeadline: state.updateDeadline,
  }));
  return (
    <DatePicker
      selected={deadline}
      onChange={(date: Date) => updateDeadline(date)}
      timeInputLabel=""
      showIcon
      icon={<DateIcon className="w-5 h-5" />}
      className="w-[35%] border border-gray-300 rounded-md p-4 flex gap-4"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

export default DatePickerComponent;
