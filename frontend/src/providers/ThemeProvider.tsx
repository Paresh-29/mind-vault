import { useRecoilState } from "recoil";
import { themeState } from "../state/atom";
import { useEffect } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useRecoilState(themeState);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
};
