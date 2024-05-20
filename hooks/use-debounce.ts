import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect((): () => void => {
        const timeout: NodeJS.Timeout = setTimeout((): void => {
            setDebouncedValue(value)
        }, delay);

        return (): void => {
            clearTimeout(timeout);
        }
    }, [value, delay]);

    return debouncedValue;
}