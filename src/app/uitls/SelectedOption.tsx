import {FC} from "react";
import {type} from "node:os";
import {Data, Filter} from "../type/Types";

type OptionProps={
    option: Data;
    handle?: (key: string, val: number) => void;
    clicked:Filter
}


const SelectedOption:FC<OptionProps> =({option, handle, clicked})=>{

    return (
        <div key={option.id} className={`no-drag`}
             style={{marginBottom: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}
             onClick={() => handle?.(clicked.key, Number(option.id))}>
            <span style={{marginRight: '8px'}}>{option.name}</span>
            <button
                style={{border: 'none', background: 'transparent', cursor: 'pointer'}}

            >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="5" y1="5" x2="19" y2="19" stroke="black" strokeWidth="1"/>
                    <line x1="19" y1="5" x2="5" y2="19" stroke="black" strokeWidth="1"/>
                </svg>
            </button>
        </div>
    )
}
export default SelectedOption