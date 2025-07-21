import GroupOptionData from "./GroupOptionData";
import React, {FC} from "react";
import {Filter} from "../type/Types";

type GroupProps ={
    clicked :Filter;
    handle?: (key: string, val: number) => void;
}


const GroupOption:FC<GroupProps> =({clicked, handle})=>{

    return(
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                height: '383px',
                padding: '16px 16px',
                overflowY: 'auto',
                alignContent: 'flex-start',
            }}
        >
            {clicked?.data.map(el => (
                <GroupOptionData option={el} handle={handle} clicked={clicked}/>
            ))}
        </div>
    )
}
export default GroupOption