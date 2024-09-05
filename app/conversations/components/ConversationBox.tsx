'use client';

import {useRouter} from "next/navigation";
import clsx from "clsx";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
    data: any,
    selected?: boolean,
}

const ConversationBox: React.FC<ConversationBoxProps> = ({data, selected}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/conversations/${data._id}`);
    }

    return (
        <div onClick={handleClick} className={clsx(`
            w-full
            relative
            flex
            items-center
            space-x-3
            py-2
            px-1
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
        `,
            selected ? 'bg-neutral-100' : 'bg-white'
            )}>
            <Avatar />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-neutral-800">
                            {data.name}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">
                            Open to join chat
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;