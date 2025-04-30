import React from "react";
import { Button } from "../ui/Button";
import { BiMenu, BiX } from "react-icons/bi";

const SkeletonNavbar = () => {
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 fixed top-0 left-0 right-0 z-20 h-18 shadow-md transition-transform duration-300 animate-pulse">
            <div className="max-w-[1920px] mx-auto flex items-center gap-4 pl-16 transition-all duration-300">
                {/* Title Skeleton */}
                <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>

                {/* Desktop Menu Skeleton */}
                <div className="ml-auto items-center gap-3 hidden md:flex">
                    {/* Theme Toggle Skeleton */}
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

                    {/* Share Brain Button Skeleton */}
                    <Button
                        variant="secondary"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg animate-pulse"
                    >
                        <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </Button>

                    {/* Add Content Button Skeleton */}
                    <Button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg animate-pulse">
                        <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </Button>

                    {/* Logout Icon Skeleton */}
                    <button className="p-2 text-gray-900 dark:text-gray-200 hover:dark:text-red-600 transition-colors animate-pulse">
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </button>
                </div>

                {/* Mobile Hamburger Skeleton */}
                <div className="ml-auto md:hidden flex items-center">
                    <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 animate-pulse">
                        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Skeleton */}
            <div className="md:hidden mt-2 px-4 py-2 flex flex-col gap-2 text-sm animate-pulse">
                <div className="flex items-center justify-between">
                    {/* Theme Toggle Skeleton */}
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
                <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md animate-pulse"
                >
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </Button>
                <Button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-md animate-pulse">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </Button>
                <button className="p-2 text-gray-900 dark:text-gray-200 hover:dark:text-red-600 transition-colors animate-pulse">
                    <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </button>
            </div>
        </header>
    );
};

export default SkeletonNavbar;
