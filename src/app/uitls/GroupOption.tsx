import GroupOptionData from "./GroupOptionData";
import React, {FC, useState} from "react";
import {Filter, ObjectType, ValueType} from "../type/Types";
import RecursiveTree from "./RecursiveTree";
import DateSelector from "./DateSelector";

type GroupProps ={
    clicked? :Filter | null;
    handle?: (key: string, val: any, type?: 'only' | 'date' | undefined) => void;
    searchButton?: boolean;
    values?: ValueType| null;
}


const GroupOption:FC<GroupProps> =({clicked, handle, searchButton, values})=>{


    const [expanded, setExpanded] =useState<number[] | null>(null);
    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize:'13px',
                height: searchButton ?'360px' : '417px',
                padding: '8px 0',
                overflowY: 'auto',
                alignContent: 'flex-start',

            }}
        >
            { clicked?.type==='date' && (
                <div style={{ width:'100%', height:'100%', padding:'4px 16px' }}>
                    <DateSelector  clicked={clicked} data={clicked.data} values={values} handle={handle}/>
                </div>

            )}
            { clicked?.recursive && (
                <div style={{ width:'100%', height:'100%'}}>
                    <RecursiveTree expanded={expanded} setExpanded={setExpanded} clicked={clicked} data={clicked.data} values={values} handle={handle}/>
                </div>
            )}

            { !clicked?.recursive && clicked?.data.map((el, index) => (
                <GroupOptionData key={index} option={el} handle={handle} clicked={clicked} values={values}/>
            ))}

        </div>
    )

}
export default GroupOption