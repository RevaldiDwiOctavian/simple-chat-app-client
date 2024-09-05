import axios from 'axios';
import {FieldValues} from "react-hook-form";
import {config} from "@/middleware";

const API_URL = "http://localhost:8080";

export const registerPost = async (data: FieldValues) => {
    return await axios.post(`${API_URL}/auth/register`, data);
};

export const loginPost = async (data: FieldValues) => {
    return await axios.post(`${API_URL}/auth/login`, data);
};

export const getCurrentUser = async (token: string | undefined) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    };

    return await axios.get(`${API_URL}/auth/profile`, config);
};

export const getChats = async (token: string | undefined) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }

    const res = await axios.get(`${API_URL}/chat`, config);
    return res.data;
}

export const getMessages = async (token: string | undefined, chatId: string) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`},
    }

    const res = await axios.get(`${API_URL}/chat/messages/${chatId}`, config);
    return res.data;
}

export const getChat = async (token: string | undefined, chatId: string) => {
    const res = await axios.get(`${API_URL}/chat/${chatId}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
    return res.data;
}

export const sendChat = async (token: string | undefined, chatId: string, userId: string | null, content: FieldValues) => {
    const res = await axios.post(`${API_URL}/chat/${chatId}/messages/${userId}`, content,
        {
            headers: {Authorization: `Bearer ${token}`},
        });
    return res.data;
}