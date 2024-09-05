'use client';

import clsx from "clsx";
import {format, parseISO} from 'date-fns';

interface MessageBoxProps {
    data: any;
    isLast: boolean;
    userId: string | null;
}

const MessageBox: React.FC<MessageBoxProps> = ({data, isLast, userId}) => {
    const isOwn = userId === data.sender;

    const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

    const body = clsx("flex flex-col gap-2", isOwn && "items-end");

    const message = clsx("text-sm w-fit rounded-full p-3 overflow-hidden", isOwn ? "bg-sky-500 text-white" : "bg-gray-100");
    return (
        <div className={container}>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.senderName}
                    </div>
                    <div className="text-xs text-gray-400">
                        {data.timestamp}
                    </div>
                </div>
                <div className={message}>
                    {data.content}
                </div>
            </div>
        </div>
    )
}

export default MessageBox;