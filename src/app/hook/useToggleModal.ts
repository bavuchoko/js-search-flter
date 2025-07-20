import { useState, useCallback } from "react";
import {Element, ValueType} from "../type/Types";

export const useFilterHandle = () => {


    const [values, setValue] =useState<ValueType | null>(null)

    const handle = useCallback((key: string, val: number) => {
        setValue(prev => {
            if (!prev) {
                return { [key]: [val] };
            }

            const currentVals = (prev[key] as number[] | undefined) ?? [];
            const index = currentVals.indexOf(val);
            let newVals: number[];

            if (index === -1) {
                newVals = [...currentVals, val];
            } else {
                newVals = currentVals.filter(v => v !== val);
            }

            const newState = { ...prev };

            if (newVals.length === 0) {
                delete newState[key];
            } else {
                newState[key] = newVals;
            }

            return Object.keys(newState).length === 0 ? null : newState;
        });
    }, []);


    return {
        values,
        handle,
    };
};
