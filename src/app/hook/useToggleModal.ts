import {useCallback, useState} from "react";
import {ValueType} from "../type/Types";

export const useFilterHandle = (onValueChange?: (value: ValueType | null) => void) => {


    const [values, setValue] =useState<ValueType | null>(null)

    const handle = useCallback(
        (key: string, val: number) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev) {
                    newState = { [key]: [val] };
                } else {
                    const currentVals = (prev[key] as number[] | undefined) ?? [];
                    const index = currentVals.indexOf(val);
                    let newVals: number[];

                    if (index === -1) {
                        newVals = [...currentVals, val];
                    } else {
                        newVals = currentVals.filter(v => v !== val);
                    }

                    newState = { ...prev };
                    if (newVals.length === 0) {
                        delete newState[key];
                    } else {
                        newState[key] = newVals;
                    }

                    if (Object.keys(newState).length === 0) {
                        newState = null;
                    }
                }

                if (onValueChange) {
                    onValueChange(newState);
                }

                return newState;
            });
        },
        [onValueChange]
    );

    const reset = useCallback(() => {
        setValue(null);
        if (onValueChange) {
            onValueChange(null);
        }
    }, [onValueChange]);

    return {
        values,
        handle,
        reset,
    };

    return {
        values,
        handle,
        reset,
    };
};
