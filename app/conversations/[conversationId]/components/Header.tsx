 "use client";

import {getChat, getChats} from "@/util/ApiService";
 import Cookies from "js-cookie";
 import {useEffect, useState} from "react";
 import Avatar from "@/app/components/Avatar";

 interface HeaderProps {
    conversationId: string;
}

const Header: React.FC<HeaderProps> = ({conversationId}) => {
    const [chat, setChat] = useState({
        _id: "",
        participants: [],
        name: "",
        messages: [],
        createdAt: "",
        updatedAt: "",
        _v: 0
    });

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = Cookies.get('token');
                const response = await getChat(token, conversationId);
                setChat(response);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        fetchChats();
    }, [conversationId]);

    // @ts-ignore
    return (
        <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Avatar />
                <div className="flex flex-col">
                    <div>
                        {chat.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500 w-50 overflow-hidden">
                        {chat.participants.map((participant, index) => (
                            `${participant}${index === chat.participants.length - 1 ? "" : ", "}`
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

 export default Header;