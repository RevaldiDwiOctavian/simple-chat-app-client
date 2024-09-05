'use client';

import {getChat, getMessages} from "@/util/ApiService";
import {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import MessageBox from "@/app/conversations/[conversationId]/components/MessageBox";

interface ChatBodyProps {
    conversationId: string;
    socket: any
}

const ChatBody: React.FC<ChatBodyProps> = ({conversationId, socket}) => {
    const [messages, setMessages] = useState([{
        id: '',
        sender: '',
        senderName: '',
        content: ''
    }]);
    const bottomRef = useRef<HTMLDivElement>(null);

    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const token = Cookies.get('token');
                const response = await getMessages(token, conversationId);
                setMessages(response);
            } catch (error) {
                console.error('Failed to fetch chats:', error);
            }
        };

        socket.on("receiveMessage", (data: { id: string, sender: string, senderName: string, content: string }) => {
            setMessages((prevMessages) => {
                // Check if message with the same id already exists
                const messageExists = prevMessages.some((message) => message.id === data.id);

                // If it doesn't exist, add the new message
                if (!messageExists) {
                    return [...prevMessages, data];
                }

                // If it exists, return the previous state without changes
                return prevMessages;
            });
        });

        fetchChats();
    }, [conversationId, socket]);
    
    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index) => {
                console.log(message)
                return (
                    <MessageBox userId={userId} data={message} isLast={index === messages.length - 1} key={message.id}/>
                )
            })}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    )
}

export default ChatBody;