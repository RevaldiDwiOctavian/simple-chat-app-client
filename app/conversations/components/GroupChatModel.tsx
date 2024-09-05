'use client';

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Modal from "@/app/components/Modal";

interface GroupChatModelProps {
    isOpen?: boolean;
    onClose: () => void;
}

const GroupChatModel: React.FC<GroupChatModelProps> = ({isOpen, onClose}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {register, handleSubmit, setValue, watch,formState: {
        errors,
    }} = useForm<FieldValues>({
        defaultValues: {
            name: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('http://localhost:8080/chat', data, {
            headers: {Authorization: `Bearer ${Cookies.get('token')}`},
        }).then(() => {
            router.refresh();
            onClose();
        }).catch((err) => {
            toast.error(err.message);
        });
    }


    return (
        <Modal isOpen={isModalOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">asdasd</div>
            </form>
        </Modal>
    )
}

export default GroupChatModel;