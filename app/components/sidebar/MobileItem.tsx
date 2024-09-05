'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
    icon: any;
    href: string;
    onClick?: () => void,
    active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({icon: Icon, active, href, onClick}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

    return (
        <Link onClick={onClick} href={href} className={clsx(`
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            hover:text-black
            hover:bg-gray-100
        `,
            !active ? "text-gray-500" : "text-black bg-gray-100"
            )}>
            <Icon className="h-6 w-6"/>
        </Link>
    )
}

export default MobileItem;