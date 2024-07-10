"use client";
import { NewsPaperIcon } from "@/app/components/icons/newspaper-icon";
import { UsersIcon } from "@/app/components/icons/users-icon";
import { FC } from "react";
import { StepObject, Steps } from "../../domain/wizard";
import { SendIcon } from "@/app/components/icons/send-icon";
import { useWizard } from "../../repository/store/wizard";

export const SelectStep: FC<{ step: Steps; i: number }> = ({ step, i }) => {
  const { steps } = useWizard((state: { steps: StepObject }) => ({
    steps: state.steps,
  }));

  return (
    <div
      className={`flex  items-center justify-center ${
        steps.complete && steps.id === step.id && "after: border-green-2000"
      } ${
        step.id !== 3 &&
        "w-full after:content-[''] after:w-full after:border-b "
      } `}
    >
      <div
        className={`flex w-auto gap-8 border ${
          steps.id === step.id ? "border-green-2000" : "border-gray"
        }border-gray py-2 px-2 rounded-full justify-between items-center `}
      >
        <div className="step">
          {step.id === 1 && (
            <UsersIcon
              className={`w-[4rem] h-[4rem] rounded-full text-white ${
                steps.id === 1 ? "bg-green-2000" : "bg-gray-300"
              }  p-[1rem]`}
            />
          )}
          {step.id === 2 && (
            <NewsPaperIcon
              className={`w-[4rem] h-[4rem] rounded-full text-white ${
                steps.id === 2 ? "bg-green-2000" : "bg-gray-300"
              }  p-[1rem]`}
            />
          )}
          {step.id === 3 && (
            <SendIcon
              className={`w-[4rem] h-[4rem] rounded-full text-white ${
                steps.id === 3 ? "bg-green-2000" : "bg-gray-300"
              }  p-[1rem]`}
            />
          )}
        </div>

        <div className="flex flex-col px-4">
          <h5
            className={`w-44 ${
              steps.id === step.id ? "text-green-2000" : "text-black"
            }  font-bold`}
          >
            {step.title}
          </h5>
          <p className="w-44">{step.subTitle}</p>
        </div>
      </div>
    </div>
  );
};
