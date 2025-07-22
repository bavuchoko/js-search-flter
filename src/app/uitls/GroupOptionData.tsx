import {FC} from "react";
import {Filter, ValueType} from "../type/Types";
import OptionIcons from "./OptionIcons";
import {useChecked} from "../hook/useChecked";
import {useDataHandler} from "../hook/useDataHandler";

type OptionProps={
    option: any;
    handle?: (key: string, val: number) => void;
    clicked?: Filter
    values?: ValueType | null
}


const GroupOptionData:FC<OptionProps> =({option, handle, clicked, values})=>{

    const { checkIncludes } = useChecked();
    const { getNestedValue } = useDataHandler();
    const checked = checkIncludes(values ?? {}, clicked?.key ?? '', option.id);
    return (
        <div key={option.id} className={`no-drag ${checked ? 'js-search-checked' :''}`}
             style={{
                 marginBottom: '6px',
                 width:'calc(50% - 4px)',
                 display: 'flex',
                 paddingLeft:'16px',
                 paddingRight:'16px',
                 alignItems: 'center',
                 cursor: 'pointer'
             }}
             onClick={() => {if(clicked) handle?.(clicked.key, Number(option.id))}}>
            <OptionIcons style={{width:'18px', height:'18px'}} type={clicked?.type} checked={checked}/>
            {clicked?.target ? (
                clicked.target.map(el =>(
                        <span className={`${clicked.key}-${el.replace('.','-')}`} style={{marginRight: '8px'}}>{getNestedValue(option, el)}</span>
                    ) )
                ):(
                <span  style={{marginRight: '8px'}}>{option.name}</span>
            )}

        </div>
    )
}
export default GroupOptionData