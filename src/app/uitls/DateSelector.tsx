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

    const handleChange = (
        key: string,
        field: "startDate" | "endDate",
        value: string
    ) => {
        // 현재 값 가져오기
        const prev = values?.[key] || {};


        if(typeof prev ==='object') {
            const newVal = {
                ...prev,
                [field]: value,
            };
            handle?.(key, newVal, "date");
        }
    };

    return(
        <div>
            {labels?.map((el, index)=>{
                const val = values?.[keys[index]];
                console.log(val)
                return (
                <div key={index} style={{borderBottom:'1px solid var(--innerBorder)', paddingBottom:'20px'}}>
                    <p style={{fontWeight:'bold'}}>{el}</p>
                    <input className={`js-search-date`} type={'date'} value={(val as ObjectType)?.startDate} onChange={(e) =>
                        handleChange(keys[index], "startDate", e.target.value)
                    }/>
                    <span> - </span>
                    <input className={`js-search-date`} type={'date'} value={(val as ObjectType)?.endDate} onChange={(e) =>
                        handleChange(keys[index], "endDate", e.target.value)
                    }/>
                </div>)

            })}
        </div>
    )
}
export default DateSelector;