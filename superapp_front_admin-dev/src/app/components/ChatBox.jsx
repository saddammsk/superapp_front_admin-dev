'use client'

import React, {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import { getMessages } from "../../services/MessagesService";
import { removeDuplicates } from "../../utils/removeDuplicate";
import Link from "next/link";
import UserMessage from "./UserMessages";
import Image from 'next/image'
import { getDecodedToken } from "@/utils/utils";

const ChatBox = ({ socket, channelId, user }) => {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket?.emit("joinChannel", channelId?.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId]);

  useEffect(() => {
    (async () => {
      const { data } = await getMessages(channelId?.id);
      setChats(data.data);
    })();
  }, [channelId]);

  useEffect(() => {
    if (socket) {
      socket?.on("Message", (obj) => {
        setChats((prev) => [...prev, obj]);
        console.log(obj);
      });
    }
  }, [socket]);

  const sendMessage = (e) => {
    if (e.key === "Enter") {
        console.log('CLicked')
      const user = getDecodedToken();
      setMessage("");
      socket.emit(
        "sendMessage",
        {
          message: e.target.value,
          channel: channelId?.id,
          receiverId: channelId?.receiverId,
          userPhoto: channelId?.receivPhoto,
          fullName: user.firstName + " " + user.lastName,
          identity: false,
          userid: user.staff_id,
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  let uniqueArray = removeDuplicates(chats, "id");
  
  return (
    <div className=" h-full">
      <div className="lg:hidden block border-b border-gray-1000 px-4">
        <Link
          href="/direct-message"
          className="inline-flex items-center gap-4 py-4 "
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

          <div className="flex gap-2">
            <Image
              className=" w-6 h-6 rounded-full"
              src="/assets/images/default-chat-user.png"
              alt="no-img"
              width={24}
              height={24}
            />
            <h3 className="font-semibold md:text-sm text-xs mb-1.5 mt-0.5">
              Samantha Grey
            </h3>
          </div>
        </Link>
      </div>

      <div className="absolute left-1/2 lg:top-4 top-[74px] -translate-x-1/2 z-10 bg-[#ffffffcf] rounded-lg">
        <h3 className=" px-3 py-1 border border-gray-1000 inline-flex items-center justify-center rounded-md text-sm h-8">
          Today
        </h3>
      </div>

      <div className="w-full h-full lg:max-h-[670px] max-h-[497px] overflow-auto documents-overflow px-4 pt-6 pb-10 lg:pb-0">
        <div className="w-full">
          {uniqueArray.map((item, idx) => (
            <UserMessage
              key={idx}
              fullName={item.user}
              message={item.message}
              userPhoto={item?.userPhoto}
              createdDate={item?.createdAt}
              senderPhoto={user?.image}
            />
          ))}
        </div>

        <div className="flex px-4 py-3 absolute left-0 bottom-0 w-full border-t border-gray-1000 gap-2.5 z-10 bg-white">
          {/* <Image
            className=" w-6 h-6 rounded-full"
            src={user?.image}
            alt="no-img"
            width={24}
            height={24}
          /> */}
          <input
            type="text"
            value={message}
            onChange={(val) => setMessage(val.target.value)}
            className="w-full focus:outline-none text-sm"
            placeholder="Add comments..."
            onKeyDown={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
