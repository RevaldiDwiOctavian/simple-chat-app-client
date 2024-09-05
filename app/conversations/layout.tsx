import Sidebar from "@/app/components/sidebar/Sidebar";
import ConversationList from "@/app/conversations/components/ConversationList";
import React from "react";

export default async function ConversationsLayout({children}: {children: React.ReactNode}) {
    return (
        <Sidebar>
            <ConversationList />
            {children}
        </Sidebar>
    )
}