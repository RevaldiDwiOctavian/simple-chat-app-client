import React from "react";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function ChatLayout({
                                             children,
                                         }: { children: React.ReactNode; }) {
    return (
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    )
}