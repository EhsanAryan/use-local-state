import { useEffect, useState } from "react"

export const useLocalState = (key, initialValue = null, onInvalidValue) => {
    const [value, setValue] = useState(() => {
        const localValue = localStorage.getItem(key);
        if (!localValue) return initialValue;
        if (localValue.trim() === "undefined") return initialValue;
        try {
            return JSON.parse(localValue);
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        if (value instanceof File || value instanceof Blob || typeof value === "function") {
            if (onInvalidValue && typeof onInvalidValue === "function") {
                // callback for invalid values
                onInvalidValue(value);
            } else {
                console.warn(
                    `⚠️ The value of ${key} is a File/Blob or Function. Cannot store File/Blob or Function in localStorage.`
                );
            }
            return;
        }
        if (value === undefined || value === null) return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            if (
                error.name === "QuotaExceededError" ||
                error.name === "NS_ERROR_DOM_QUOTA_REACHED"
            ) {
                console.error(`⛔ localStorage is full! Could not save value of ${key}`);
            } else {
                console.error(`⛔ Something went wrong! Could not save value of ${key}`);
            }
        }
    }, [key, value, onInvalidValue]);

    return [value, setValue];
}