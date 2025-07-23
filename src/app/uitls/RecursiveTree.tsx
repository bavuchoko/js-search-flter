import React, {FC} from "react";
import OptionIcons from "../resources/svg/OptionIcons";
import {ObjectType, OptionProps} from "../type/Types";
import {useChecked} from "../hook/useChecked";
import ChevronRight from "../resources/svg/ChevronRight";
import Dash from "./Dash";
import ChevronDown from "../resources/svg/ChevronDown";


const RecursiveTree:FC<OptionProps> =({handle, clicked, elements, values, expanded, setExpanded, depth=1}) =>{

    const { checkIncludes } = useChecked();


    const expandedHandler =(id:number)=>{
        setExpanded?.((prev: number[] | null) => {
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
                {elements?.map((option, index) => {
                    const checked = checkIncludes(values ?? {}, clicked?.key ?? '', option.id);
                    const keys: string[] = Array.isArray(clicked?.key)
                        ? clicked!.key.map((k: ObjectType) => k.key.toString())
                        : clicked?.key ? [clicked.key] : [];

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
                                background:((index + depth) % 2) !== 0? '':'var(--background)',
                                cursor:'pointer',
                            }}
                            className={checked ? 'js-search-checked': ''}
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
                            <span
                                id={Array.isArray(clicked?.key) ? clicked?.key.join(",") : clicked?.key}
                                className={`no-drag`}
                                style={{textIndent:'0px'}}
                                onClick={() => {if(clicked) handle?.(keys[0], option.id, 'only')}}
                            >
                              {option.name}
                            </span>
                        </div>

                        {expanded?.includes(option.id)  && (
                            <div style={{textIndent: (depth * 15)+'px'}}>
                                <RecursiveTree elements={option.children} clicked={clicked} handle={handle} setExpanded={setExpanded} expanded={expanded} values={values} depth={depth + 1}/>
                            </div>
                        )}
                    </React.Fragment>
                )})}
        </div>
    )
}
export default RecursiveTree;