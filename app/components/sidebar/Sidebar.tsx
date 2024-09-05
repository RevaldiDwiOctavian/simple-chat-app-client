'use client';

import {ReactNode, useState} from "react";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import MobileFooter from "@/app/components/sidebar/MobileFooter";

function Sidebar ({children}: {children: ReactNode}) {

    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileFooter />
            <main className="lg:pl-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default Sidebar;