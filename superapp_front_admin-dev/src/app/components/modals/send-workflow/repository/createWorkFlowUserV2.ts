import { post } from "@/services/RestService";
import { toast } from "react-toastify";

export const createWorkflowUserV2 = async ({
  fullHide,
  getWorkflowEmissionsHistory,
  user,
  lng,
  generated,
  router,
  pathname,
  resetState
}: {
  fullHide: any;
  getWorkflowEmissionsHistory: (value: string) => void;
  user: { acc_id: string };
  lng: any;
  generated: any;
  router: any;
  pathname: any;
  resetState: () => void
}) => {
  try {
    const { data } = await post(
      `:40002/workflow/v1/users/create-wf-user-v2`,
      generated
    );
    if (data.success) {
      resetState();
      toast.success(`Operación satisfactoria`);
      fullHide();
      if (pathname === `/${lng}/admin/history`) {
        getWorkflowEmissionsHistory(
          `:40002/workflow/v1/users/ByAccId?accId=${user.acc_id}`
        );
      } else {
        router.push(`/${lng}/admin/history`);
      }
    }
  } catch (error) {}
};
