import { useState, useCallback } from "react";
import {Element, ValueType} from "../type/Types";

export const useFilterHandle = () => {


    const [values, setValue] =useState<ValueType | null>(null)

    const handle = useCallback((v: Element) => setValue(v), []);

    return {
        values,
        handle,
    };
};
