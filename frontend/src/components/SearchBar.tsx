import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        onSearch(searchQuery);
        setIsSearching(false);
      }
    }, 400); // Slightly more relaxed debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, onSearch]);

  const handleClear = () => setSearchQuery("");

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full sm:w-[500px] mx-auto px-4"
    >
      <div className="relative transition-all duration-300">
        <input
          type="search"
          id="modern-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="peer block w-full p-4 ps-10 pe-20 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for designs, ideas, components..."
          aria-label="Search input"
        />
        {/* Search Icon */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>

        {/* Clear button */}
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-20 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-white"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {/* Submit/Search button */}
        <button
          type="submit"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          aria-label="Submit search"
        >
          {isSearching ? "..." : "Search"}
        </button>
      </div>
    </form>
  );
}
