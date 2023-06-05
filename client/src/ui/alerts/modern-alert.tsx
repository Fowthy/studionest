'use client';

import { useState } from "react";

export const ModernAlert = ({ text, badge, timeout }: { text: string; badge: string, timeout: number }) => {
    const [isOpen, setIsOpen] = useState(true);
    setTimeout(() => {
        setIsOpen(false);
    }, timeout);


  return (
    <div className={` p-2 ${!isOpen ? 'opacity-0' : 'opacity-100'} bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex transition-opacity lg:inline-flex`} role="alert">
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{badge}</span>
        <span className="font-semibold mr-2 text-left flex-auto">{text}</span>
    </div>
  );
};
