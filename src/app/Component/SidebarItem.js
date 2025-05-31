'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarItem({ href, icon: Icon, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
                isActive
                    ? '!bg-[#02b3da] !text-gray-600 !font-semibold !shadow'
                    : 'text-white hover:!bg-[#0e7a93]'
            }`}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{label}</span>
        </Link>
    );
}
