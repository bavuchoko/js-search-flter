import GroupOptionData from "./GroupOptionData";
import React, {FC} from "react";
import {Filter, ValueType} from "../type/Types";

type GroupProps ={
    clicked? :Filter | null;
    handle?: (key: string, val: number) => void;
    height?: string;
    values?: ValueType| null;
}


const GroupOption:FC<GroupProps> =({clicked, handle, height, values})=>{
    if (clicked?.type === 'date') {
    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                height: height ??'447px',
                padding: '16px 16px',
                overflowY: 'auto',
                alignContent: 'flex-start',
            }}
        >
            {clicked.data}
        </div>
    )}

    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                height: height ??'447px',
                padding: '16px 16px',
                overflowY: 'auto',
                alignContent: 'flex-start',
            }}
        >
            {clicked?.data.map(el => (
                <GroupOptionData option={el} handle={handle} clicked={clicked} values={values}/>
            ))}
        </div>
    )
}
export default GroupOption