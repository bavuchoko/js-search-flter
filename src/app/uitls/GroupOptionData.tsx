import {FC} from "react";
import {Filter, ValueType} from "../type/Types";
import OptionIcons from "./OptionIcons";
import {useChecked} from "../hook/useChecked";

type OptionProps={
    option: any;
    handle?: (key: string, val: number) => void;
    clicked?: Filter
    values?: ValueType | null
}


const GroupOptionData:FC<OptionProps> =({option, handle, clicked, values})=>{

    const { checkIncludes } = useChecked();

    const checked = checkIncludes(values ?? {}, clicked?.key ?? '', option.id);

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
             onClick={() => {if(clicked) handle?.(clicked.key, Number(option.id))}}>
            <OptionIcons style={{width:'18px', height:'18px'}} type={clicked?.type} checked={checked}/>
            <span style={{marginRight: '8px'}}>{option.name}</span>
        </div>
    )
}
export default GroupOptionData