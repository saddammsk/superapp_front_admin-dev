"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TasksList = () => {
  const router = usePathname();
  return (
    <div className="flex flex-col gap-5">
      <div className=" w-full border border-gray-1000 rounded-md p-4">
        <p className=" text-xs text-gray-4000 font-medium mb-4">Tasks Lists</p>

        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href="/apply-sign"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "/apply-sign" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00033 2.83341L9.66699 5.50008M0.666992 11.8335H3.33366L10.3337 4.83345C10.6873 4.47983 10.8859 4.00022 10.8859 3.50012C10.8859 3.00002 10.6873 2.52041 10.3337 2.16679C9.98004 1.81316 9.50042 1.6145 9.00033 1.6145C8.50023 1.6145 8.02061 1.81316 7.66699 2.16679L0.666992 9.16679V11.8335Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Confidentiality Agreement
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00033 2.83341L9.66699 5.50008M0.666992 11.8335H3.33366L10.3337 4.83345C10.6873 4.47983 10.8859 4.00022 10.8859 3.50012C10.8859 3.00002 10.6873 2.52041 10.3337 2.16679C9.98004 1.81316 9.50042 1.6145 9.00033 1.6145C8.50023 1.6145 8.02061 1.81316 7.66699 2.16679L0.666992 9.16679V11.8335Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Some Document
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00033 2.83341L9.66699 5.50008M0.666992 11.8335H3.33366L10.3337 4.83345C10.6873 4.47983 10.8859 4.00022 10.8859 3.50012C10.8859 3.00002 10.6873 2.52041 10.3337 2.16679C9.98004 1.81316 9.50042 1.6145 9.00033 1.6145C8.50023 1.6145 8.02061 1.81316 7.66699 2.16679L0.666992 9.16679V11.8335Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mr-auto text-red-1000">Some Other Document</span>
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1.5L1 9.5M1 1.5L9 9.5"
                  stroke="#E03137"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.00033 2.83341L9.66699 5.50008M0.666992 11.8335H3.33366L10.3337 4.83345C10.6873 4.47983 10.8859 4.00022 10.8859 3.50012C10.8859 3.00002 10.6873 2.52041 10.3337 2.16679C9.98004 1.81316 9.50042 1.6145 9.00033 1.6145C8.50023 1.6145 8.02061 1.81316 7.66699 2.16679L0.666992 9.16679V11.8335Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mr-auto text-green-2000">
                Very Other Document
              </span>
              <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33301 4.50008L4.66634 7.83341L11.333 1.16675"
                  stroke="#0CAF60"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 3.83341H10.3333M9 6.50008H10.3333M3.66667 9.16675H10.3333M1 3.16675C1 2.63632 1.21071 2.12761 1.58579 1.75253C1.96086 1.37746 2.46957 1.16675 3 1.16675H11C11.5304 1.16675 12.0391 1.37746 12.4142 1.75253C12.7893 2.12761 13 2.63632 13 3.16675V9.83341C13 10.3638 12.7893 10.8726 12.4142 11.2476C12.0391 11.6227 11.5304 11.8334 11 11.8334H3C2.46957 11.8334 1.96086 11.6227 1.58579 11.2476C1.21071 10.8726 1 10.3638 1 9.83341V3.16675ZM3.66667 5.16675C3.66667 5.52037 3.80714 5.85951 4.05719 6.10956C4.30724 6.35961 4.64638 6.50008 5 6.50008C5.35362 6.50008 5.69276 6.35961 5.94281 6.10956C6.19286 5.85951 6.33333 5.52037 6.33333 5.16675C6.33333 4.81313 6.19286 4.47399 5.94281 4.22394C5.69276 3.97389 5.35362 3.83341 5 3.83341C4.64638 3.83341 4.30724 3.97389 4.05719 4.22394C3.80714 4.47399 3.66667 4.81313 3.66667 5.16675Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Verify ID/Passport/Tax Registration
            </Link>
          </li>

          <li>
            <Link
              href="/attachments"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "/attachments" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.9998 4.16656L4.66647 8.4999C4.40125 8.76511 4.25226 9.12482 4.25226 9.4999C4.25226 9.87497 4.40125 10.2347 4.66647 10.4999C4.93169 10.7651 5.2914 10.9141 5.66647 10.9141C6.04154 10.9141 6.40125 10.7651 6.66647 10.4999L10.9998 6.16656C11.5302 5.63613 11.8282 4.91671 11.8282 4.16656C11.8282 3.41642 11.5302 2.69699 10.9998 2.16656C10.4694 1.63613 9.74995 1.33813 8.9998 1.33813C8.24966 1.33813 7.53024 1.63613 6.9998 2.16656L2.66647 6.4999C1.87082 7.29554 1.42383 8.37468 1.42383 9.4999C1.42383 10.6251 1.87082 11.7042 2.66647 12.4999C3.46212 13.2955 4.54125 13.7425 5.66647 13.7425C6.79169 13.7425 7.87082 13.2955 8.66647 12.4999L12.9998 8.16656"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Attachment
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1.5C6.46957 1.5 5.96086 1.71071 5.58579 2.08579C5.21071 2.46086 5 2.96957 5 3.5M5 3.5V11.5M5 3.5C5 2.96957 4.78929 2.46086 4.41421 2.08579C4.03914 1.71071 3.53043 1.5 3 1.5M5 11.5C5 12.0304 5.21071 12.5391 5.58579 12.9142C5.96086 13.2893 6.46957 13.5 7 13.5M5 11.5C5 12.0304 4.78929 12.5391 4.41421 12.9142C4.03914 13.2893 3.53043 13.5 3 13.5M7.66667 4.16667H12.3333C12.5101 4.16667 12.6797 4.2369 12.8047 4.36193C12.9298 4.48695 13 4.65652 13 4.83333V10.1667C13 10.3435 12.9298 10.513 12.8047 10.6381C12.6797 10.7631 12.5101 10.8333 12.3333 10.8333H7.66667M2.33333 4.16667H1.66667C1.48986 4.16667 1.32029 4.2369 1.19526 4.36193C1.07024 4.48695 1 4.65652 1 4.83333V10.1667C1 10.3435 1.07024 10.513 1.19526 10.6381C1.32029 10.7631 1.48986 10.8333 1.66667 10.8333H2.33333M10.3333 7.5H10.34M7.66667 7.5H7.67333"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fill Form 1 (Download)
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1.5C6.46957 1.5 5.96086 1.71071 5.58579 2.08579C5.21071 2.46086 5 2.96957 5 3.5M5 3.5V11.5M5 3.5C5 2.96957 4.78929 2.46086 4.41421 2.08579C4.03914 1.71071 3.53043 1.5 3 1.5M5 11.5C5 12.0304 5.21071 12.5391 5.58579 12.9142C5.96086 13.2893 6.46957 13.5 7 13.5M5 11.5C5 12.0304 4.78929 12.5391 4.41421 12.9142C4.03914 13.2893 3.53043 13.5 3 13.5M7.66667 4.16667H12.3333C12.5101 4.16667 12.6797 4.2369 12.8047 4.36193C12.9298 4.48695 13 4.65652 13 4.83333V10.1667C13 10.3435 12.9298 10.513 12.8047 10.6381C12.6797 10.7631 12.5101 10.8333 12.3333 10.8333H7.66667M2.33333 4.16667H1.66667C1.48986 4.16667 1.32029 4.2369 1.19526 4.36193C1.07024 4.48695 1 4.65652 1 4.83333V10.1667C1 10.3435 1.07024 10.513 1.19526 10.6381C1.32029 10.7631 1.48986 10.8333 1.66667 10.8333H2.33333M10.3333 7.5H10.34M7.66667 7.5H7.67333"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fill Form 2
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={`flex justify-start items-center py-2 px-2 text-xs gap-2 rounded-lg ${
                router === "#" && "bg-[#EBF5F0]"
              } w-full text-black-1000`}
            >
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33366 3.83341V1.83341C9.33366 1.6566 9.26342 1.48703 9.1384 1.36201C9.01337 1.23699 8.8438 1.16675 8.66699 1.16675H2.00033C1.6467 1.16675 1.30756 1.30722 1.05752 1.55727C0.807468 1.80732 0.666992 2.14646 0.666992 2.50008M0.666992 2.50008C0.666992 2.8537 0.807468 3.19284 1.05752 3.44289C1.30756 3.69294 1.6467 3.83341 2.00033 3.83341H10.0003C10.1771 3.83341 10.3467 3.90365 10.4717 4.02868C10.5968 4.1537 10.667 4.32327 10.667 4.50008V6.50008M0.666992 2.50008V10.5001C0.666992 10.8537 0.807468 11.1928 1.05752 11.4429C1.30756 11.6929 1.6467 11.8334 2.00033 11.8334H10.0003C10.1771 11.8334 10.3467 11.7632 10.4717 11.6382C10.5968 11.5131 10.667 11.3436 10.667 11.1667V9.16675M11.3337 6.50008V9.16675H8.66699C8.31337 9.16675 7.97423 9.02627 7.72418 8.77622C7.47414 8.52618 7.33366 8.18704 7.33366 7.83341C7.33366 7.47979 7.47414 7.14065 7.72418 6.89061C7.97423 6.64056 8.31337 6.50008 8.66699 6.50008H11.3337Z"
                  stroke="#359765"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Payment
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
