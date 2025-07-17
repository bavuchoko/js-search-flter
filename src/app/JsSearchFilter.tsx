import {FC} from "react";
import {FilterProps} from "./type/Types";
import '../index.css';




const JsSearchFilter: FC<FilterProps> =({filter =[], onSearch=undefined})=>{
    return (
        <div style={{display:'flex'}}>
            {filter.map(el=>(
                <div className="js-option">
                    {el.label}
                    <span className="chevron">ｖ</span>
                </div>
            ))}
        </div>
    )
}
export default JsSearchFilter;