'use client';

import {useEffect, useState} from "react";
import {getChats} from "@/util/ApiService";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import clsx from "clsx";
import {MdOutlineGroupAdd} from "react-icons/md";
import ConversationBox from "@/app/conversations/components/ConversationBox";
import GroupChatModel from "@/app/conversations/components/GroupChatModel";

const ConversationList = () => {
    const [chats, setChats] = useState([{
        id: "",
        participants: [],
        name: "",
        messages: []
    }]);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = Cookies.get('token');
                const response = await getChats(token)
                setChats(response);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <>
            <GroupChatModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            <aside className={clsx(`
            fixed
            inset-y-0
            pb-20lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-hidden
            border-r
            border-gray-200
        `,
                isOpen ? "hidden" : "block w-full left-0")}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Chats
                        </div>
                        <div
                            className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
                            onClick={() => setIsModalOpen(true)}>
                            <MdOutlineGroupAdd size={20}/>
                        </div>
                    </div>
                    {chats.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <ConversationBox data={item} selected={conversationId === item.id}/>
                            </div>
                        )
                    })}
                </div>
            </aside>
        </>
    );
}

export default ConversationList;