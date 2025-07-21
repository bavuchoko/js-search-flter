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

    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize:'13px',
                height: searchButton ?'355px' : '417px',
                padding: '8px 0',
                overflowY: 'auto',
                alignContent: 'flex-start',

            }}
        >
            { clicked?.type==='date' && (<>{clicked.data}</>)}
            { clicked?.recursive && (
                <div style={{ width:'100%', height:'100%'}}>
                    <RecursiveTree keys={clicked.key} type={clicked.type} data={clicked.data} handle={singleHandler}/>
                </div>
            )}

            { !clicked?.recursive && clicked?.data.map(el => (
                <GroupOptionData option={el} handle={multiHandler} clicked={clicked} values={values}/>
            ))}

        </div>
    )

}
export default GroupOption