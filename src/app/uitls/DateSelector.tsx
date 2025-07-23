import {Filter, ObjectType, ValueType} from "../type/Types";
import React, {FC} from "react";
import TrashIcon from "../resources/svg/TrashIcon";

type Props = {
    handle?: (key: string, val: any, type?: 'only' | 'date' | undefined) => void;
    remove?: (key: string, val: any, type?: 'only' | 'date' | undefined) => void;
    clicked?: Filter
    values?: ValueType | null
}

const DateSelector:FC<Props> =({handle, clicked, remove, values})=>{
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


    const handleRemove = (
        key: string
    ) => {
            remove?.(key, undefined, "date");
    };

    return(
        <div>
            {labels?.map((el, index)=>{
                const val = values?.[keys[index]];
                console.log(keys[index], val)
                return (
                <div key={index} style={{borderBottom:'1px solid var(--innerBorder)', paddingBottom:'20px'}}>
                    <p style={{fontWeight:'bold'}}>{el}</p>
                    <div key={index}
                         style={{
                             borderBottom: '1px solid var(--innerBorder)',
                             paddingBottom: '20px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'space-between'
                         }}>
                        <div>
                            <input className={`js-search-date`} type={'date'} value={(val as ObjectType)?.startDate || ''} onChange={(e) =>
                                handleChange(keys[index], "startDate", e.target.value)
                            }/>
                            <span style={{marginLeft:'5px', marginRight:'5px'}}></span>
                            <input className={`js-search-date`} type={'date'} value={(val as ObjectType)?.endDate || ''} onChange={(e) =>
                                handleChange(keys[index], "endDate", e.target.value)
                            }/>
                        </div>
                        <TrashIcon style={{width:'17px', height:'17px', cursor:'pointer'}} onClick={(e) =>
                            handleRemove(keys[index])
                        }/>
                    </div>
                </div>)

            })}
        </div>
    )
}
export default DateSelector;