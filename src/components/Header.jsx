import React from "react";

export default function Header() {
    return (<div>
            <header
                className="bg-white dark:bg-gray-900 flex items-center justify-between px-8 py-4 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div
                        className="bg-gray-900 dark:bg-white rounded-full w-10 h-10 flex items-center justify-center text-white dark:text-gray-900 font-bold shadow-sm">
                        J
                    </div>
                    <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-wide">
                    Job Application Helper
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition">
                        New Offer
                    </button>
                    <button
                        className="bg-transparent border border-gray-900 dark:border-white px-4 py-2 rounded-md font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                        Profile
                    </button>
                </div>
            </header>
        </div>);
}

