'use client';

import {HiUserGroup} from "react-icons/hi2";
import Image from "next/image";

const Avatar = () => {
    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 bg-gray-200 p-2">
                <div className="flex flex-col items-center justify-between">
                    <HiUserGroup size={35} />
                </div>
            </div>
        </div>
    )
}

export default Avatar;