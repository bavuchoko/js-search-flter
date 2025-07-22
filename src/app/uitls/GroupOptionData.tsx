import {FC} from "react";
import {Filter, ObjectType, ValueType} from "../type/Types";
import OptionIcons from "./OptionIcons";
import {useChecked} from "../hook/useChecked";
import {useDataHandler} from "../hook/useDataHandler";

type OptionProps={
    option: any;
    handle?: (key: string | string[], val: any, type?: 'only' | 'date' | undefined) => void;
    clicked?: Filter
    values?: ValueType | null
}


const GroupOptionData:FC<OptionProps> =({option, handle, clicked, values})=>{

    const { checkIncludes } = useChecked();
    const { getNestedValue } = useDataHandler();
    const checked = checkIncludes(values ?? {}, clicked?.key ?? '', option.id);
    const keys: string[] = Array.isArray(clicked?.key)
        ? clicked!.key.map((k: ObjectType) => k.key.toString())
        : clicked?.key ? [clicked.key] : [];
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
             onClick={() => {if(clicked) handle?.(keys, option.id, undefined)}}>
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