"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { shallow } from "zustand/shallow";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { faBoxOpen, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatBox from "./ChatBox";
import { generateSocket } from "../../utils/socket.config";
import { getMessages } from "../../services/MessagesService";
import { jwtDecode } from "jwt-decode";
import { removeDuplicates } from "../../utils/removeDuplicate";
import {
  getInternalUsers,
  getExternalUsers,
  getWorkflows,
} from "../../services/UsersService";
import { createChannel, getChannels } from "../../services/ChannelsService";
import { getDecodedToken } from "@/utils/utils";

const MainTabs = () => {
  const user = getDecodedToken();
  const socket = generateSocket();
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [groupChannels, setGroupChannels] = useState([]);
  const [externalUsers, setExternalUsers] = useState([]);
  const [dms, setDms] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [channelId, setChannelId] = useState("");
  const [userData, setUserData] = useState({
    receiverId: "",
    names: "",
    image: "",
  });

  const [tabSelected, setTabSelected] = useState(0);
  const [workflows, setWorkFlows] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [groupChat, setGroupChat] = useState();
  const [chatsGroup, setChatsGroup] = useState([]);
  const [comment, setComment] = useState("");
  const [createdChannel, setCreatedChannel] = useState(null);

  function setUpSocket() {
    socket.on("connect", onConnected);
    socket.on("disconnect", onDisconnected);
  }

  useEffect(() => {
    setUpSocket();

    return () => setUpSocket();
  }, []);

  const onConnected = () => {
    setIsConnected(true);
  };

  const onDisconnected = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    populateExternalDms();
    populateInternalDms();

    getWorkflow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    populateChannels();
    populateGroupChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (socket) {
      socket?.emit("joinChannel", channelId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(channelId);
      setChatsGroup(data.data);
    })();
  }, [channelId]);

  useEffect(() => {
    if (socket) {
      socket?.on("Message", (obj) => {
        setChatsGroup((prev) => [...prev, obj]);
      });
    }
  }, [socket]);

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      const user = getDecodedToken();

      socket.emit(
        "sendMessage",
        {
          message: e.target.value,
          channel: channelId,
          fullName: user.firstName + " " + user.lastName,
          identity: false,
          userid: user.staff_id,
          accId: user?.acc_id,
          userPhoto: user?.image,
        },
        (err) => {}
      );
      setComment("");
    }
  };

  useEffect(() => {
    if (socket && createdChannel) {
      socket.emit("direct", createdChannel?.id);
    }
  }, [socket, createdChannel]);

  useEffect(() => {
    if (socket) {
      socket.emit("directChannel", createdChannel);
    }
  }, [socket, createdChannel]);

  useEffect(() => {
    if (socket) {
      socket.on("channelCreated", (obj) => {
        setChannels((prev) => [...prev, obj]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("channelUpdated", (id) => {
        socket.emit("direct", id);
      });
    }
  }, [socket]);

  const populateChannels = async () => {
    const { data } = await getChannels(false, user?.staff_id);
    setChannels(data.data);
  };

  const populateGroupChannels = async () => {
    const { data } = await getChannels(true, user?.staff_id, user?.acc_id);
    setGroupChat(data.data);
  };

  const populateExternalDms = async () => {
    const { data } = await getExternalUsers(user?.acc_id);
    setExternalUsers(data.data);
  };

  const populateInternalDms = async () => {
    const { data } = await getInternalUsers(user?.acc_id);
    console.log("Data DMS ", data);
    setDms(data.data);
  };

  const getWorkflow = async () => {
    const { data } = await getWorkflows(user?.staff_id);
    setWorkFlows(data.data);
  };

  const handleChange = ({ target }) => {
    let filteredUser = [];

    filteredUser = externalUsers.filter(
      (item, idx) => item?.staff_id == target?.value
    );
    if (filteredUser.length > 0) {
      setUserData({
        ...userData,
        image: filteredUser[0]?.image,
        receiverId: filteredUser[0]?.staff_id,
        names: filteredUser[0]?.firstName + " " + filteredUser[0]?.lastName,
        com_name: filteredUser[0]?.com_name,
        com_image: filteredUser[0]?.com_image,
        userRole: "external",
      });
    } else {
      filteredUser = dms.filter((item, idx) => item?.staff_id == target?.value);
      setUserData({
        ...userData,
        image: filteredUser[0]?.image,
        receiverId: filteredUser[0]?.staff_id,
        names: filteredUser[0]?.firstName + " " + filteredUser[0]?.lastName,
        com_name: filteredUser[0]?.com_name,
        com_image: filteredUser[0]?.com_image,
        userRole: "internal",
      });
    }
  };

  const handleFlowChange = ({ target }) => {
    const filteredWorkflow = workflows.filter(
      (item) => item?.workflow_id == target.value
    );

    setSelectedData(filteredWorkflow[0].data);
    setUserData({
      ...userData,
      [target.name]: target.value,
      workFlowName: filteredWorkflow[0]?.emission_name,
    });
  };

  const handleTopicChange = ({ target }) => {
    const filteredTopic = selectedData.filter(
      (item) => item?.id == target.value
    );

    setUserData({
      ...userData,
      ["topicId"]: target.value,
      topicName: filteredTopic[0]["block_key"],
    });
  };

  const handleCreateChannel = async (channelId) => {
    setChannelId(channelId);
  };

  const showModal = () => {
    //   addNotification({
    //     title: 'Warning',
    //     subtitle: 'This is a subtitle',
    //     message: 'This is a very long message',
    //     theme: 'darkblue',
    //     native: true // when using native, your OS will handle theming.
    // });
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      isGroup: false,
      acc_id: user.staff_id,
      receiver_id: userData?.receiverId,
      fullName: user.firstName + " " + user.lastName,
      recFullName: userData?.names,
      userPhoto: user?.image,
      receivPhoto: userData?.image,
      companyName: userData?.com_name,
      companyImage: userData?.com_image,
      role: userData?.userRole,
    };

    const payloadGroup = {
      account_id: user?.acc_id,
      acc_id: user.staff_id,
      receiver_id: userData.receiverId,
      fullName: user.firstName + " " + user.lastName,
      recFullName: userData.names,
      userPhoto: user?.image,
      receivPhoto: userData.image,
      workFlowId: userData?.workFlowId,
      workFlowName: userData?.workFlowName,
      topicId: userData?.topicId,
      topicName: userData?.topicName,
      companyName: userData?.com_name,
      companyImage: userData?.com_image,
      role: userData?.userRole,
    };

    const selectedPayload = tabSelected === 0 ? payload : payloadGroup;
    const isGroup = tabSelected === 0 ? false : true;

    const { status, data } = await createChannel(isGroup, selectedPayload);

    if (status == 201 || status == 200) {
      setCreatedChannel(data.data);
      setOpen(false);
    }
  };

  let uniqueArray = removeDuplicates(chatsGroup, "id");
  let uniqueChannels = removeDuplicates(channels, "id");

  let checkInternal = uniqueChannels.filter((item) => item?.role == "internal");
  let checkExternal = uniqueChannels.filter((item) => item?.role == "external");

  return (
    <>
      <div
        className={`${
          open ? "fixed" : "hidden"
        } w-screen h-screen z-50 top-0 flex justify-center p-6 items-center left-0 bg-transparent`}
      >
        <div className="w-full h-full absolute top-0 left-0 bg-black-1000 opacity-30"></div>
        <div className="relative w-full max-w-[500px] pb-10 max-h-[760px] z-50">
          <div className="w-full bg-white border relative border-gray-1000 h-full rounded-lg md:p-6 p-4">
            <div className=" absolute top-2 right-6 z-10">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                href="/"
                className="items-center gap-4 text-sm font-semibold py-3 mb-3 inline-flex"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1.5L1 9.5M1 1.5L9 9.5"
                    stroke="#000"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <form className="max-w mx-auto mt-10" onSubmit={handleSubmit}>
              {tabSelected === 0 ? (
                <div>
                  <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select User
                  </label>
                  <select
                    id="small"
                    name="workFlowId"
                    onChange={(e) => handleChange(e)}
                    className="block w-full p-2 pr-5 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a User</option>
                    {[...dms, ...externalUsers].map(
                      (item, key) =>
                        item?.firstName + " " + item?.lastName !=
                          user?.firstName + " " + user?.lastName && (
                          <option key={key} value={item.staff_id}>
                            {item?.firstName + " " + item?.lastName}
                          </option>
                        )
                    )}
                  </select>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a Workflow
                  </label>
                  <select
                    id="small"
                    name="workFlowId"
                    onChange={(e) => handleFlowChange(e)}
                    className="block w-full p-2 pr-5 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Choose a workflow</option>
                    {workflows.map(
                      (item, key) =>
                        item?.emission_name.length > 0 && (
                          <option
                            key={key}
                            onClick={() => setSelectedData(item?.data)}
                            value={item.workflow_id}
                          >
                            {item?.emission_name}
                          </option>
                        )
                    )}
                  </select>

                  {/* <label
                    htmlFor="small"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a process
                  </label>
                  <select
                    id="small"
                    name="id"
                    onChange={(e) => handleTopicChange(e)}
                    className="block w-full p-2 pr-5 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Choose a process</option>
                    {selectedData.map(
                      (item, key) =>
                        item?.block_key.length > 0 && (
                          <option key={key} value={item?.id}>
                            {item?.block_key}
                          </option>
                        )
                    )}
                  </select> */}
                </div>
              )}

              <button
                type="submit"
                className="bg-[#359765] w-full py-3 rounded-lg text-white font-medium"
              >
                Start Channel
              </button>
            </form>
          </div>
        </div>
      </div>
      <Tab.Group>
        <div className="flex items-center justify-between">
          <Tab.List className=" bg-gray-3000 w-full md:w-fit inline-flex rounded-lg py-0.5 px-0.5 outline outline-1 outline-gray-1000">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  onClick={() => setTabSelected(0)}
                  className={
                    selected
                      ? "bg-white rounded-lg text-sm font-medium text-black-1000 px-5 md:w-[109px] w-1/2 py-3 block outline outline-1 outline-gray-1000"
                      : "bg-transparent block text-sm text-black px-5 md:w-[109px] w-1/2 py-3"
                  }
                >
                  DMs
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  onClick={() => setTabSelected(1)}
                  className={
                    selected
                      ? "bg-white rounded-lg text-sm font-medium text-black-1000 px-5 md:w-[109px] w-1/2 py-3 block outline outline-1 outline-gray-1000"
                      : "bg-transparent block text-sm text-black px-5 md:w-[109px] w-1/2 py-3"
                  }
                >
                  Processes
                </button>
              )}
            </Tab>
          </Tab.List>
          <button
            onClick={showModal}
            className="bg-[#359765] px-4 py-2 rounded-lg text-white font-medium"
          >
            Create Channel
          </button>
        </div>
        <Tab.Panels className="w-full mt-6 outline-none">
          <Tab.Panel className="outline-none">
            <div className="w-full flex lg:flex-nowrap flex-wrap gap-5">
              <div className=" lg:w-1/3 w-full border border-gray-1000 rounded-lg ">
                <div className="p-4 flex items-center gap-2.5 text-base font-semibold border-b border-gray-1000">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25033 9.25006C7.33366 11.3334 10.667 11.3334 12.7503 9.25006M13.8353 12.41C13.8353 12.41 13.8995 12.3642 14.002 12.2859C15.5378 11.0984 16.502 9.37753 16.502 7.4617C16.502 3.89003 13.1436 0.991699 9.00195 0.991699C4.86029 0.991699 1.50195 3.89003 1.50195 7.4617C1.50195 11.035 4.86029 13.8334 9.00195 13.8334C9.35529 13.8334 9.93529 13.81 10.742 13.7634C11.7936 14.4467 13.3286 15.0075 14.672 15.0075C15.0878 15.0075 15.2836 14.6659 15.017 14.3175C14.612 13.8209 14.0536 13.025 13.837 12.4092L13.8353 12.41Z"
                      stroke="#525D69"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Direct Message
                </div>

                <div className="">
                  <div className="w-full h-full max-h-[683px] overflow-auto documents-overflow">
                    <p className="mx-3 mt-3 text-gray-400 font-medium">
                      Internal User
                    </p>
                    <ul>
                      {uniqueChannels.map(
                        (item, idx, arr) =>
                          arr.filter((item) => item.role == "internal").length >
                            0 &&
                          item?.role == "internal" && (
                            <li
                              onClick={() => {
                                handleCreateChannel(item);
                              }}
                              key={idx}
                            >
                              <div
                                className={`current-chat p-4 inline-flex flex-col gap-1 transition-all hover:bg-gray-6000 w-full cursor-pointer ${
                                  item?.id == channelId?.id
                                    ? `bg-gray-200`
                                    : `bg-transparent`
                                }`}
                              >
                                <div className="flex gap-2">
                                  {(item?.receivPhoto || item?.userPhoto) && (
                                    <Image
                                      className=" w-6 h-6 rounded-full"
                                      src={
                                        (item?.userId == user?.staff_id
                                          ? item?.userPhoto
                                          : item?.userPhoto) || '/img/default-avatar.jpg'
                                      }
                                      alt="no-img"
                                      width={24}
                                      height={24}
                                    />
                                  )}
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-sm mb-1.5 mt-0.5">
                                      {item.userId == user.staff_id
                                        ? item.receiverUser || item.user
                                        : item.user}
                                    </h3>
                                  </div>
                                </div>
                                {/* <div className=' bg-gray-6000 rounded flex gap-1 items-center h-7 px-1'>
                              <Image className=' w-4 h-4 rounded-full' src="/assets/images/america-icon.png" alt='no-imf' width={16} height={16} />
                              <p className=' text-xs text-black-2000'>{item.con_name}</p>
                            </div> */}
                              </div>
                            </li>
                          )
                      )}
                      {checkInternal?.length < 1 && (
                        <small className="m-5 text-gray-300">
                          <FontAwesomeIcon icon={faBoxOpen} /> No Internal Users
                        </small>
                      )}
                    </ul>
                    <p className="mx-3 mt-3 text-gray-400 font-medium">
                      External User
                    </p>
                    {uniqueChannels.map(
                      (item, idx, arr) =>
                        arr.filter((item) => item.role == "external").length >
                          0 &&
                        item?.role == "external" && (
                          <li
                            onClick={() => {
                              handleCreateChannel(item);
                            }}
                            key={idx}
                          >
                            <div
                              className={`current-chat p-4 inline-flex flex-col gap-1 transition-all hover:bg-gray-6000 w-full cursor-pointer ${
                                item?.id == channelId?.id
                                  ? `bg-gray-200`
                                  : `bg-transparent`
                              }`}
                            >
                              <div className="flex gap-2">
                                {(item?.receivPhoto || item?.userPhoto) && (
                                  <Image
                                    className=" w-6 h-6 rounded-full"
                                    src={
                                      item?.userId == user?.staff_id
                                        ? item?.userPhoto
                                        : item?.userPhoto
                                    }
                                    alt="no-img"
                                    width={24}
                                    height={24}
                                  />
                                )}
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-sm mb-1.5 mt-0.5">
                                    {item.userId == user.staff_id
                                      ? item.receiverUser || item.user
                                      : item.user}
                                  </h3>
                                </div>
                              </div>
                              {/* <div className=' bg-gray-6000 rounded flex gap-1 items-center h-7 px-1'>
                              <Image className=' w-4 h-4 rounded-full' src="/assets/images/america-icon.png" alt='no-imf' width={16} height={16} />
                              <p className=' text-xs text-black-2000'>{item.con_name}</p>
                            </div> */}
                            </div>
                          </li>
                        )
                    )}
                    {checkExternal < 1 && (
                      <small className="m-5 text-gray-300">
                        <FontAwesomeIcon icon={faBoxOpen} /> No External Users
                      </small>
                    )}
                  </div>
                </div>
              </div>

              <div className=" lg:w-2/3 w-full border relative border-gray-1000 rounded-lg p-4 pl-0 pr-0 lg:pt-4 pt-0 overflow-hidden">
                {channelId ? (
                  <ChatBox channelId={channelId} socket={socket} user={user} />
                ) : (
                  <div>
                    <h1 className="text-[50px] text-gray-400 font-extrabold text-center">
                      Inbox
                    </h1>
                    <p className="text-center mt-5 text-gray-600">
                      Click on user to start a conversation
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
        <Tab.Panels className="outline-none">
          <Tab.Panel className="w-full mt-6 outline-none">
            <div className="w-full flex lg:flex-nowrap flex-wrap gap-5">
              <div className="lg:w-1/3 w-full border border-gray-1000 rounded-lg">
                <div className="p-4 flex items-center gap-2.5 text-base font-semibold border-b border-gray-1000">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25033 9.25006C7.33366 11.3334 10.667 11.3334 12.7503 9.25006M13.8353 12.41C13.8353 12.41 13.8995 12.3642 14.002 12.2859C15.5378 11.0984 16.502 9.37753 16.502 7.4617C16.502 3.89003 13.1436 0.991699 9.00195 0.991699C4.86029 0.991699 1.50195 3.89003 1.50195 7.4617C1.50195 11.035 4.86029 13.8334 9.00195 13.8334C9.35529 13.8334 9.93529 13.81 10.742 13.7634C11.7936 14.4467 13.3286 15.0075 14.672 15.0075C15.0878 15.0075 15.2836 14.6659 15.017 14.3175C14.612 13.8209 14.0536 13.025 13.837 12.4092L13.8353 12.41Z"
                      stroke="#525D69"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Topic Message
                </div>
                <div className="">
                  <div className="w-full h-full max-h-[683px] overflow-auto documents-overflow">
                    <ul className="w-full h-full">
                      {groupChat?.map((item, idx) => (
                        <li
                          onClick={() => {
                            handleCreateChannel(item?.id);
                          }}
                          key={idx}
                        >
                          <a
                            href="#"
                            className={`current-chat p-4 inline-flex flex-col gap-1 transition-all hover:bg-gray-6000 w-full ${
                              item?.id == channelId?.id
                                ? `bg-gray-200`
                                : `bg-transparent`
                            }`}
                          >
                            <div className="flex gap-2">
                              {/* <Image
                                className=" w-6 h-6 rounded-full"
                                src="/assets/images/default-chat-user.png"
                                alt="no-img"
                                width={24}
                                height={24}
                              /> */}
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm mb-1.5 mt-0.5">
                                  {item.workFlowName}
                                </h3>
                                {/* {item?.workFlowName && (
                                  <div className=" bg-gray-800 rounded flex gap-1 items-center justify-center h-7 px-1">
                                    {item?.path_aws_iconImage && (
                                      <Image
                                        className=" w-4 h-4 rounded-full"
                                        src={item?.path_aws_iconImage}
                                        alt="no-imf"
                                        width={16}
                                        height={16}
                                      />
                                    )}
                                    <p className=" text-xs text-black-2000">
                                      {item?.workFlowName}
                                    </p>
                                  </div>
                                )} */}
                              </div>
                            </div>
                            <p className="text-xs text-gray-4000">
                              {item?.workFlowName}
                            </p>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 w-full border relative border-gray-1000 rounded-lg md:p-6 p-4">
                <div className="lg:hidden block">
                  <Link
                    href="/direct-message"
                    className="items-center gap-4 text-sm font-semibold py-3 mb-3 inline-flex"
                  >
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.16675 6H12.8334M1.16675 6L6.16675 11M1.16675 6L6.16675 1"
                        stroke="#273444"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Processes
                  </Link>
                </div>
                <div className="w-full h-full flex flex-col">
                  <Tab.Group>
                    <Tab.List className=" bg-gray-3000 inline-flex rounded-lg py-0.5 px-0.5 outline outline-1 outline-gray-1000">
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 px-5 w-1/3 py-3 block outline outline-1 outline-gray-1000"
                                : "bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3"
                            }
                          >
                            General
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 md:px-5 px-2.5 w-1/3 py-3 block outline outline-1 outline-gray-1000"
                                : "bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3"
                            }
                          >
                            Internal
                          </button>
                        )}
                      </Tab>
                      <Tab as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={
                              selected
                                ? "bg-white rounded-lg text-xs sm:text-sm font-bold font-dm-sans text-black-1000 md:px-5 px-2.5 w-1/3 py-3 block outline outline-1 outline-gray-1000"
                                : "bg-transparent block text-xs sm:text-sm font-semibold text-gray-4000 md:px-5 px-2.5 w-1/3 py-3"
                            }
                          >
                            Documents
                          </button>
                        )}
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-6 outline-none">
                      <Tab.Panel className="outline-none">
                        <div className="w-full h-full min-h-[541px] overflow-auto documents-overflow">
                          <ul>
                            {uniqueArray?.map((item, i) => (
                              <li key={i}>
                                <div className="p-3 border-b border-gray-1000">
                                  <div className="flex gap-3 items-center mb-2">
                                    {/* <Image
                                      className=" w-8 h-8 rounded-full"
                                      src="/assets/images/assigned-img-1.png"
                                      alt="no-img"
                                      width={32}
                                      height={32}
                                    /> */}
                                    <div className="flex flex-col">
                                      <h4 className="text-sm font-bold font-dm-sans">
                                        {item?.user}
                                      </h4>
                                      {/* <p className="text-xs font-dm-sans text-gray-2000">
                                        Signer ⏤ Tesla
                                      </p> */}
                                    </div>
                                  </div>
                                  <p className="text-xs font-dm-sans text-black-3000">
                                    {item?.message}
                                  </p>
                                </div>
                              </li>
                            ))}

                            {/* <li>
                              <div className="p-3 border-b border-gray-1000">
                                <div className="flex gap-3 items-center mb-2">
                                  <Image
                                    className=" w-8 h-8 rounded-full"
                                    src="/assets/images/assigned-img-1.png"
                                    alt="no-img"
                                    width={32}
                                    height={32}
                                  />
                                  <div className="flex flex-col">
                                    <h4 className="text-sm font-bold font-dm-sans">
                                      José Noel Barrios
                                    </h4>
                                    <p className="text-xs font-dm-sans text-gray-2000">
                                      Signer ⏤ Tesla
                                    </p>
                                  </div>
                                </div>
                                <div className="xl:flex gap-2.5 items-center">
                                  <p className="text-xs font-dm-sans text-black-3000">
                                    Thanks for your help. I’m have a problem
                                    with
                                  </p>

                                  <div className="flex xl:mt-0 mt-5 max-w-[175px] items-center bg-gray-6000 rounded p-1 gap-1 ">
                                    <svg
                                      width="10"
                                      height="12"
                                      viewBox="0 0 10 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M6.16699 0.75V3.08333C6.16699 3.23804 6.22845 3.38642 6.33785 3.49581C6.44724 3.60521 6.59562 3.66667 6.75033 3.66667H9.08366M6.16699 0.75H2.08366C1.77424 0.75 1.47749 0.872916 1.2587 1.09171C1.03991 1.3105 0.916992 1.60725 0.916992 1.91667V10.0833C0.916992 10.3928 1.03991 10.6895 1.2587 10.9083C1.47749 11.1271 1.77424 11.25 2.08366 11.25H7.91699C8.22641 11.25 8.52316 11.1271 8.74195 10.9083C8.96074 10.6895 9.08366 10.3928 9.08366 10.0833V3.66667M6.16699 0.75L9.08366 3.66667"
                                        stroke="#00A2FF"
                                        strokeWidth="1.16667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="font-dm-sans text-blue-2000 text-xs">
                                      @Confidential Agreement
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li> */}
                          </ul>
                        </div>

                        <div className="flex mt-6 px-4 h-14 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 z-10 bg-white">
                          <input
                            type="text"
                            className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                            placeholder="Leave comment"
                            value={comment}
                            onChange={(val) => setComment(val.target.value)}
                            onKeyDown={sendMessage}
                          />
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="outline-none">
                      <Tab.Panel className="outline-none ">
                        <div className="h-full">
                          <div className="w-full h-full max-h-[541px] overflow-auto documents-overflow">
                            <ul>
                              {uniqueArray?.map((item, i) => item?.accId == user?.acc_id && (
                                <li key={i}>
                                  <div className="p-3 border-b border-gray-1000">
                                    <div className="flex gap-3 items-center mb-2">
                                      {/* <Image
                                        className=" w-8 h-8 rounded-full"
                                        src="/assets/images/assigned-img-1.png"
                                        alt="no-img"
                                        width={32}
                                        height={32}
                                      /> */}
                                      <div className="flex flex-col">
                                        <h4 className="text-sm font-bold font-dm-sans">
                                          {item?.user}
                                        </h4>
                                        {/* <p className="text-xs font-dm-sans text-gray-2000">
                                          Signer ⏤ Tesla
                                        </p> */}
                                      </div>
                                    </div>
                                    <p className="text-xs font-dm-sans text-black-3000">
                                      {item?.message}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex  mt-6 px-4 h-14 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 z-10 bg-white">
                            <input
                              type="text"
                              className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                              placeholder="Leave comment"
                              value={comment}
                              onChange={(val) => setComment(val.target.value)}
                              onKeyDown={sendMessage}
                            />
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                    <Tab.Panels className="outline-none">
                      <Tab.Panel className="outline-none">
                        <div className="h-full">
                          <div className="w-full h-full max-h-[541px] overflow-auto documents-overflow">
                            <ul className="border mb-3 border-gray-1000 p-4 rounded-md">
                              <li>
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                        Do you offer technical support?
                                        <ChevronRightIcon
                                          className={` w-4 h-4 ${
                                            open
                                              ? "-rotate-90 transform"
                                              : "rotate-90 transform"
                                          }`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        <div className="p-3 mt-4 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-4.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                Bank of America
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Reviewer
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                Sure, tell me which part of the
                                                2nd page?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3  font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                            </ul>
                            <ul className="border mb-3 border-gray-1000 p-4 rounded-md">
                              <li>
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                        Some Document
                                        <ChevronRightIcon
                                          className={` w-4 h-4 ${
                                            open
                                              ? "-rotate-90 transform"
                                              : "rotate-90 transform"
                                          }`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        <div className="p-3 mt-4 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-4.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                Bank of America
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Reviewer
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                Sure, tell me which part of the
                                                2nd page?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3  font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                            </ul>
                            <ul className="border mb-3 border-gray-1000 p-4 rounded-md">
                              <li>
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex text-xs font-medium text-black-3000 w-full justify-between items-center">
                                        Some Other Document
                                        <ChevronRightIcon
                                          className={` w-4 h-4 ${
                                            open
                                              ? "-rotate-90 transform"
                                              : "rotate-90 transform"
                                          }`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel>
                                        <div className="p-3 mt-4 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3 border-b border-gray-1000 font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-4.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                Bank of America
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Reviewer
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                Sure, tell me which part of the
                                                2nd page?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="p-3  font-dm-sans">
                                          <div className="flex gap-3 items-center mb-2">
                                            <Image
                                              className=" w-8 h-8 rounded-full"
                                              src="/assets/images/user-img-2.png"
                                              alt="no-img"
                                              width={32}
                                              height={32}
                                            />
                                            <div className="flex flex-col">
                                              <h4 className="text-sm font-bold font-dm-sans">
                                                José Noel Barrios
                                              </h4>
                                              <p className="text-xs font-dm-sans text-gray-2000">
                                                Signer ⏤ Tesla
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex gap-2 items-center">
                                            <div className="tag flex gap-2 items-center">
                                              <p className="text-xs">
                                                I have a little problem here in
                                                2nd page of this document, can
                                                you help?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </li>
                            </ul>
                          </div>
                          <div className="flex mt-6 px-4 h-14 py-3 rounded-lg w-full border border-gray-9000 gap-2.5 bg-white">
                            <input
                              type="text"
                              className="w-full focus:outline-none text-sm placeholder:text-[10px] sm:placeholder:text-sm"
                              placeholder="Leave comment on Confidentiality Agreement"
                            />
                          </div>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default MainTabs;
