'use client';

import useConversation from "@/app/hooks/useConversation";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {sendChat} from "@/util/ApiService";
import Cookies from "js-cookie";
import MessageInput from "@/app/conversations/[conversationId]/components/MessageInput";
import {HiPaperAirplane} from "react-icons/hi2";

interface Props {
    socket: any
}

const ChatForm: React.FC<Props> = ({socket}) => {
    const {conversationId} = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            content: '',
            sender: localStorage.getItem('id'),
            senderName: localStorage.getItem('name'),
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        sendChat(Cookies.get('token'), conversationId, localStorage.getItem('id'), data).then(r => socket.emit("sendMessage", data));
        setValue('content', '', {shouldValidate: true});
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput id="content" register={register} errors={errors} required placeholder="Write a message" />
                <button type="submit" className="rounded-full p-2 bg-sky-200 cursor-pointer hover:bg-sky-600 transition ">
                    <HiPaperAirplane size={18} className="text-white" />
                </button>
            </form>
        </div>
    )
}

export default ChatForm;