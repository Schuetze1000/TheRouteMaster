import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useColorMode() {
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultColorMode = systemPrefersDark ? "dark" : "light";
  
  const [colorMode, setColorMode] = useLocalStorage("color-theme", defaultColorMode);

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;