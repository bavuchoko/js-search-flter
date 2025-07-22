import {Filter, ValueType} from "../type/Types";
import React, {FC} from "react";

type Props = {
    handle?: (key: string, val: any, type?: 'only' | 'date' | undefined) => void;
    clicked?: Filter
    data: any[];
    values?: ValueType | null
}

const DateSelector:FC<Props> =({handle, clicked, data, values})=>{
    return(
        <>{clicked?.label}</>
    )
}
export default DateSelector;