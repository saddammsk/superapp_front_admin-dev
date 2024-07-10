"use client";
import { StepOne } from "./presentation/StepOne";
import { StepTwo } from "./presentation/StepTwo";
import { StepThree } from "./presentation/Stepthree";
import { useWizard } from "./repository/store/wizard";

const SendWorkflowWizard = () => {
  const { steps } = useWizard((state) => ({
    steps: state.steps,
  }));
  return (
    <section className="flex flex-col gap-8 justify-around">
      {steps.id === 1 && <StepOne />}
      {steps.id === 2 && <StepTwo />}
      {steps.id === 3 && <StepThree />}
    </section>
  );
};

export default SendWorkflowWizard;
