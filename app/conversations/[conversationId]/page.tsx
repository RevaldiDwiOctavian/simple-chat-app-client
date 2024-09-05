'use client';

import React from 'react';
import Header from "@/app/conversations/[conversationId]/components/Header";
import ChatBody from "@/app/conversations/[conversationId]/components/ChatBody";
import ChatForm from "@/app/conversations/[conversationId]/components/ChatForm";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";

interface IParams {
    conversationId: string;
};

const ConversationId = ({params}: {params: IParams}) => {
    const socket = io("http://localhost:8080");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleJoin = () => {
            if (params.conversationId !== "" && params.conversationId !== null) {
                console.log(params.conversationId, "roomId");
                socket.emit("joinChat", params.conversationId);
                toast.loading("Connecting to chat");
                // You can remove this setTimeout and add your own logic
                setTimeout(() => {
                    toast.dismiss()
                }, 4000);
            } else {
                alert("Please fill in Username and Room Id");
            }
        };

        handleJoin();
    }, []);

    return (
        <React.StrictMode>
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <Header conversationId={params.conversationId}/>
                    <ChatBody conversationId={params.conversationId} socket={socket}/>
                    <ChatForm socket={socket}/>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default ConversationId;