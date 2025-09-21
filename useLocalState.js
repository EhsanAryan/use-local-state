import { useEffect, useState } from "react"

export const useLocalState = (key, onInvalidValue) => {
    const [value, setValue] = useState(() => {
        const localValue = localStorage.getItem(key);
        if (!localValue) return null;
        if (localValue.trim() === "undefined") return null;
        try {
            return JSON.parse(localValue);
        } catch {
            return null;
        }
    });

    useEffect(() => {
        let toStore;
        if (value instanceof File || value instanceof Blob) {
            if (typeof onInvalidValue === "function") {
                // callback for invalid values
                onInvalidValue(value);
            } else {
                console.warn(
                    `⚠️ The value of ${key} is a File/Blob. Cannot store File/Blob in localStorage. Saving null instead.`
                );
            }
            toStore = null;
        } else {
            toStore = value === undefined ? null : value;
        }
        localStorage.setItem(key, JSON.stringify(toStore));
    }, [key, value, onInvalidValue]);

    return [value, setValue];
}