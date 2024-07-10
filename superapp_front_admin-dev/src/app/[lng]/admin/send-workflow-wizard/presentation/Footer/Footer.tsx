"use client";
import { usePathname, useRouter } from "next/navigation";
import { useWizard } from "../../repository/store/wizard";
import { useWorkflowEmissionStore } from "@/store/WorkflowEmissionStore";
import { getDecodedToken } from "@/utils/utils";
import { useUserStore } from "@/store/UserStore";

const Footer = () => {
  const { setStepComplete, steps, sendWorkflow, refreshStore } = useWizard((state) => ({
    setStepComplete: state.setStepComplete,
    steps: state.steps,
    sendWorkflow: state.sendWorkflow,
    refreshStore: state.refreshStore
  }));
  const { userv2 } = useUserStore((state) => ({
    userv2: state.user,
  }));
  const { getWorkflowEmissionsHistory } = useWorkflowEmissionStore((state) => ({
    getWorkflowEmissionsHistory: state.getWorkflowEmissionsHistory,
  }));

  const handleClick = () => {
    setStepComplete(steps.id + 1, true, true);
    if (steps.id >= 3) {
      setStepComplete(1, true, true);
    }
  };

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center">
        {
          steps.id === 1? <button className="bg-gray-400 text-white p-2 rounded-md w-48">
          Cancelar
        </button> : <button onClick={()=>setStepComplete(steps.id - 1, true, true)} className="bg-gray-400 text-white p-2 rounded-md w-48">
          Anterior
        </button>
        }
        {
          steps.id === 3 ? <button
          className="bg-green-2000 text-white p-2 rounded-md w-48"
          onClick={() => sendWorkflow(userv2.com_image, ()=>{
            refreshStore()
            if (pathname === `/es/admin/history`) {
              let user = getDecodedToken();
              getWorkflowEmissionsHistory(
                `:40002/workflow/v1/users/ByAccId?accId=${user.acc_id}`
              );
            } else {
              router.push(`/es/admin/history`);
            }
          })}
        >
          Enviar Flujo de Trabajo
        </button>:<button
          className="bg-green-2000 text-white p-2 rounded-md w-48"
          onClick={() => handleClick()}
        >
          Siguiente
        </button>
        }
        
      </div>
    </div>
  );
};

export default Footer;
