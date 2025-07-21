import GroupOptionData from "./GroupOptionData";
import React, {FC} from "react";
import {Filter, ValueType} from "../type/Types";
import RecursiveTree from "./RecursiveTree";

type GroupProps ={
    clicked? :Filter | null;
    multiHandler?: (key: string, val: number) => void;
    singleHandler?: (key: string, val: number) => void;
    searchButton?: boolean;
    values?: ValueType| null;
}


const GroupOption:FC<GroupProps> =({clicked, multiHandler, singleHandler, searchButton, values})=>{

    if (clicked?.type === 'date') {
    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                height: searchButton ?'385px' : '447px',
                padding: '16px 16px',
                overflowY: 'auto',
                alignContent: 'flex-start',
            }}
        >
            {clicked.data}
        </div>
    )}

    if (clicked?.recursive){
        return(
        <div
            style={{
            }}
        >
            <div style={{fontSize:"14px", height:'40px', fontWeight:"600", lineHeight:"40px", padding:'0 16px'}}> A - B - C </div>
            <div
                style={{
                    fontSize: '14px',
                    width:'100%',
                    height: searchButton ? '340px':'407px',
                    padding: '12px 16px',
                }}
            >
                <RecursiveTree keys={clicked.key} data={clicked.data} handle={singleHandler}/>
            </div>
        </div>

        )}



    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                height: searchButton ? '385px': '447px',
                padding: '16px 16px',
                overflowY: 'auto',
                alignContent: 'flex-start',
            }}
        >
            {clicked?.data.map(el => (
                <GroupOptionData option={el} handle={multiHandler} clicked={clicked} values={values}/>
            ))}
        </div>
    )
}
export default GroupOption