import {FC, useRef, useState} from "react";
import {Filter, FilterProps} from "./type/Types";
import '../index.css';
import {useFilterHandle} from "./hook/useToggleModal";
import FilterIcon from "./uitls/FilterIcon";
import Modal from "./uitls/Modal";
import {useToggleModal} from "./hook/useFilterHandle";
import useDragScroll from "./hook/useDragScroll";

/**
 *
 *
 * */
const JsSearchFilter: FC<FilterProps> =({filter =[], onValueChange=undefined, onSearch=undefined, onApiRequest=undefined})=>{

    const [clicked, setClicked] = useState<Filter | null>(null)

    const { isOpen, open, close, toggle } = useToggleModal();
    const {         values,
        handleMulti,
        handleSingle,
        reset,
        multiToggle,
        singular, } = useFilterHandle(onValueChange);
    const groupRef = useRef<HTMLDivElement>(null);
    useDragScroll([groupRef]);

    return (
        <div style={{width:"100%"}}>
            <div style={{display:'flex'}}>
                <FilterIcon
                    style={{
                        width:'30px',
                        height:'30px',
                        padding:'6px',
                        cursor:'pointer',
                        border:'1px solid',
                        borderColor: `${values ? 'black': 'var(--border)'}`,
                        borderRadius:'3px',
                    }}
                    onClick={toggle}
                />

                <div
                    className={'no-scroll no-drag'}
                    style={{
                        padding:"0 12px",
                        display:'flex',
                        alignItems:'center',
                        width:'100%',
                        overflowX:'hidden',
                        whiteSpace: 'nowrap'
                    }}
                    ref={groupRef}
                >
                    {filter.map(el=>(
                        <span
                            data-id={el.key}
                            style={{
                                padding:'4px 8px',
                                margin:'0 5px',
                                cursor:'pointer',
                                fontWeight:'bold',
                                display:'flex',
                                fontSize:'12px',
                                alignItems:'center',
                                color:  'var(--grayText)',
                                border:'1px solid var(--border)'
                            }}
                            onClick={()=>{setClicked(el); toggle();}}
                        >{el.label}</span>
                    ))}
                </div>
            </div>

            { isOpen && <Modal close={close} filter={filter} values={values} multiHandler={handleMulti} singleHandler={handleSingle} reset={reset} clicked={clicked} setClicked={setClicked} onSearch={onSearch}/> }

            { values &&
            <div className={`no-scroll`} style={{width:'100%', background:'green' , overflowY:'auto', padding:'5px 0'}} >

            </div>
            }
        </div>
    )
}
export default JsSearchFilter;