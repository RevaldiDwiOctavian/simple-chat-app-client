import {useMemo} from "react";
import {usePathname} from "next/navigation";
import {HiAdjustments, HiChat} from "react-icons/hi";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import useConversation from "@/app/hooks/useConversation";
import Cookies from "js-cookie";

const   useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();

    return useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId,
        },
        {
            label: 'Settings',
            href: '/settings',
            icon: HiAdjustments,
            active: pathname === '/settings',
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => {
                localStorage.clear();
                Cookies.remove('token');
                window.location.reload();
            },
            icon: HiArrowLeftOnRectangle
        }
    ], [pathname, conversationId]);
}

export default useRoutes;