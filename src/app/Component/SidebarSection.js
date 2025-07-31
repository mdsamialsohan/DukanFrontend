'use client';
import { useState } from 'react';
export default function SidebarSection({ icon: Icon, title, children, isOpen, onToggle }) {
    return (
        <div>
            <div
                className="flex items-center justify-between cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#0e7a93] transition-colors"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5" />}
                    <span>{title}</span>
                </div>
                <span>{isOpen ? '▾' : '▸'}</span>
            </div>

            {isOpen && <div className="ml-6 mt-2 space-y-1">{children}</div>}
        </div>
    );
}