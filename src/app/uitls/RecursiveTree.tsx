import {FC} from "react";
import OptionIcons from "./OptionIcons";
import {Filter, ValueType} from "../type/Types";
import {useChecked} from "../hook/useChecked";
import ChevronRight from "./ChevronRight";
import Dash from "./Dash";
import React from "react";
import ChevronDown from "./ChevronDown";

type Props = {
    handle?: (key: string, val: number) => void;
    clicked?: Filter
    data: any[];
    values?: ValueType | null
    expanded:number[] | null
    setExpanded: React.Dispatch<React.SetStateAction<number[] | null>>;
    depth?: number;
}

const RecursiveTree:FC<Props> =({handle, clicked, data, values, expanded, setExpanded, depth=1}) =>{

    const { checkIncludes } = useChecked();


    const expandedHandler =(id:number)=>{
        setExpanded((prev: number[] | null) => {
            if (!prev) return [id];
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            return [...prev, id];
        });
    }

    return (
        <div
            style={{
               width:'100%'
            }}
        >
                {data.map((option, index) => {
                    const checked = checkIncludes(values ?? {}, clicked?.key ?? '', option.id);
                    return (
                    <React.Fragment key={option.id}>
                        <div
                            key={option.id}
                            style={{
                                padding:'0 16px',
                                marginBottom:'6px',
                                height:'25px',
                                display: 'flex',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                                background:((index + depth) % 2) ==0? '':'var(--background)',
                                cursor:'pointer',
                            }}
                        >
                            <div onClick={()=>expandedHandler(option.id)}>
                                <OptionIcons style={{width:'18px', height:'18px'}} type={clicked?.type} checked={checked}/>
                                {option.children?.length >0 ?
                                    <>
                                        {expanded?.includes(option.id) ?  <ChevronDown style={{width:'18px', height:'18px'}}  /> : <ChevronRight style={{width:'18px', height:'18px'}}  /> }
                                   </>
                                    :
                                    <Dash style={{width:'18px', height:'18px'}}  />
                                }
                            </div>
                            <span id={clicked?.key}
                                  className={`no-drag`}
                                  style={{textIndent:'0px'}}
                                  onClick={() => {if(clicked) handle?.(clicked?.key, option.id)}}
                            >
                              {option.name}
                            </span>
                        </div>

                        {expanded?.includes(option.id)  && (
                            <div style={{textIndent: (depth * 15)+'px'}}>
                                <RecursiveTree data={option.children} clicked={clicked} handle={handle} setExpanded={setExpanded} expanded={expanded} values={values}  depth={depth + 1}/>
                            </div>
                        )}
                    </React.Fragment>
                )})}
        </div>
    )
}
export default RecursiveTree;