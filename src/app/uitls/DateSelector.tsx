import {Filter, ObjectType, ValueType} from "../type/Types";
import React, {FC} from "react";

type Props = {
    handle?: (key: string, val: any, type?: 'only' | 'date' | undefined) => void;
    clicked?: Filter
    data: any[];
    values?: ValueType | null
}

const DateSelector:FC<Props> =({handle, clicked, data, values})=>{
    const labels: string[] = Array.isArray(clicked?.key)
        ? clicked!.key.map((k: ObjectType) => k.label.toString())
        : clicked?.key ? [clicked.key] : [];

    const keys: string[] = Array.isArray(clicked?.key)
        ? clicked!.key.map((k: ObjectType) => k.key.toString())
        : clicked?.key ? [clicked.key] : [];

    return(
        <div>
            {labels?.map((el, index)=>{
                console.log(values?.[keys?.[index]])
                const val = values?.[keys[index]];
                return (
                <div style={{borderBottom:'1px solid var(--innerBorder)', paddingBottom:'20px'}}>
                    <p style={{fontWeight:'bold'}}>{el}</p>
                    {(typeof val === "object" && val !== null && ("startDate" in val || "endDate" in val)) && (
                            <>
                                <input className={`js-search-date`} type={'date'} value={val.startDate} />
                                <span> ~ </span>
                                <input className={`js-search-date`} type={'date'} value={val.endDate} />
                            </>
                    )}

                </div>)

            })}
        </div>
    )
}
export default DateSelector;