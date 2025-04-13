import React from 'react';
import Image from 'next/image';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Skincare Advisor' }) => {
    return (
        <header className="w-full py-4 px-6 flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 shadow-sm">
            <h1 className="text-2xl font-bold text-center text-gray-800">
                {title} <span className="text-pink-500">✨</span>
            </h1>
        </header>
    );
};

export default Header;