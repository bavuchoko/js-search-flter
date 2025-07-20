import {FC, useState} from "react";
import {Filter, FilterProps} from "./type/Types";
import '../index.css';
import {useFilterHandle} from "./hook/useToggleModal";
import FilterIcon from "./uitls/FilterIcon";
import Modal from "./uitls/Modal";
import {useToggleModal} from "./hook/useFilterHandle";


const JsSearchFilter: FC<FilterProps> =({filter =[], onValueChange=undefined, onSearch=undefined})=>{

    const [clicked, setClicked] = useState<Filter | null>(null)

    const { isOpen, open, close, toggle } = useToggleModal();
    const { values, handle, reset } = useFilterHandle(onValueChange);

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

                {filter.map(el=>(
                    <span
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

            { isOpen && <Modal close={close} filter={filter} values={values}  handle={handle} reset={reset} clicked={clicked} setClicked={setClicked}/> }

            { values &&
            <div className={`no-scroll`} style={{width:'100%', background:'green' , overflowY:'auto', padding:'5px 0'}} >

            </div>
            }
        </div>
    )
}
export default JsSearchFilter;