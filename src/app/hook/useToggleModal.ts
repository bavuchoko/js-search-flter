import { useCallback, useState } from "react";
import {ObjectType, ValueType} from "../type/Types";

export const useFilterHandle = (onValueChange?: (value: ValueType | null) => void, initialValues: (ValueType | null) = {}) => {
    const [values, setValue] = useState<ValueType | null>(initialValues);

    const multiToggle = (values: ValueType | null, key: string, val: number): ValueType | null => {
        if (!values) {
            return { [key]: [val] };
        }

        const currentVals = Array.isArray(values[key]) ? (values[key] as number[]) : [];
        const index = currentVals.indexOf(val);
        let newVals: number[];

        if (index === -1) {
            newVals = [...currentVals, val];
        } else {
            newVals = currentVals.filter(v => v !== val);
        }

        const newState = { ...values };
        if (newVals.length === 0) {
            delete newState[key];
        } else {
            newState[key] = newVals;
        }

        return Object.keys(newState).length === 0 ? null : newState;
    };


    const handleMulti = useCallback(
        (key: string, val: number) => {
            setValue(prev => {
                const newState = multiToggle(prev, key, val);
                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handleSingle = useCallback(
        (key: string, val: number) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev || !(key in prev)) {
                    newState = { ...(prev ?? {}), [key]: [val] };
                } else {
                    const currentVals = Array.isArray(prev[key]) ? (prev[key] as number[]) : [];
                    if (currentVals.length === 1 && currentVals[0] === val) {
                        const clone = { ...prev };
                        delete clone[key];
                        newState = Object.keys(clone).length === 0 ? null : clone;
                    } else {
                        newState = { ...prev, [key]: [val] };
                    }
                }

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handleDate = useCallback(
        (key: string, val: ObjectType| undefined) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev) {
                    newState = {};
                } else {
                    newState = { ...prev };
                }
                if (val === undefined) {
                    delete newState[key];
                } else {
                    newState[key] = val;
                }

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );


    const removeDate = useCallback(
        (key: string, val: ObjectType| undefined) => {
            setValue(prev => {
                let newState: ValueType | null;

                if (!prev) {
                    newState = {};
                } else {
                    newState = { ...prev };
                }

                delete newState[key];

                if (onValueChange) onValueChange(newState);
                return newState;
            });
        },
        [onValueChange]
    );

    const handle = useCallback(
        (key: string , val: number | string | ObjectType | undefined, type?: 'only' | 'date' | undefined) => {
            if (type === 'only') {
                handleSingle(key, Number(val));
            } else if (type === undefined) {
                handleMulti(key, Number(val));
            } else if (type === 'date') {
                handleDate(key, (val as ObjectType));
            }
        },
        [handleSingle, handleMulti, handleDate]
    );


    const remove = useCallback(
        (key: string , val: number | string | ObjectType | undefined, type?: 'only' | 'date' | undefined) => {
            if (type === 'only') {
                handleSingle(key, Number(val));
            } else if (type === undefined) {
                handleMulti(key, Number(val));
            } else if (type === 'date') {
                removeDate(key, (val as ObjectType));
            }

        },
        [handleSingle, handleMulti, handleDate]
    );

    const reset = useCallback(() => {
        setValue(null);
        if (onValueChange) onValueChange(null);
    }, [onValueChange]);

    return {
        values,
        handle,
        remove,
        reset,
    };
};
