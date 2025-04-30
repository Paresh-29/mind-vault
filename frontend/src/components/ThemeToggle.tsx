import { useRecoilState } from "recoil";
import { themeState } from "../state/atom";
import { MoonIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/outline";

export const ThemeToggle = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="p-2 rounded-full hover:bg-gray-200  dark:hover:bg-gray-700 transition-colors hidden sm:flex items-center justify-center"
      aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-gray-700" />
      ) : (
        <SunIcon className="w-5 h-5 text-yellow-700" />
      )}
    </button>
  );
};
