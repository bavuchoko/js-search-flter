import {FC} from "react";
import {Filter} from "../type/Types";
import CodeIcon from "./CodeIcon";

type OptionProps={
    option: any;
    handle?: (key: string, val: number) => void;
    clicked:Filter
}


const GroupData:FC<OptionProps> =({option, handle, clicked})=>{

    return (
        <div key={option.id} className={`no-drag`}
             style={{
                 marginBottom: '6px',
                 fontSize: '14px',
                 width:'calc(50% - 4px)',
                 display: 'flex',
                 alignItems: 'center',
                 cursor: 'pointer'
             }}
             onClick={() => handle?.(clicked.key, Number(option.id))}>
            <CodeIcon style={{width:'24px', height:'24px'}} />
            <span style={{marginRight: '8px'}}>{option.name}</span>
        </div>
    )
}
export default GroupData