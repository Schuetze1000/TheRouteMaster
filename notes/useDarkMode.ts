/**
import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item): initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStorage = value instanceof Function ? value(storedValue): value;

            setStoredValue(valueToStorage);

            window.localStorage.setItem(key, JSON.stringify(valueToStorage));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
};

const useDarkMode = () => {
    const [enabled, setEnabled] = useLocalStorage("dark-theme");
    const isEnabled = typeof enabledState === "undefined" && enabled;

    useEffect (() => {
        const className = "dark";
        const bodyClass = window.document.body.classList;

        isEnabled ? bodyClass.add(className): bodyClass.remove(className);
    }, [enabled, isEnabled]);

    return [enabled, setEnabled];
};

export default useDarkMode;
*/