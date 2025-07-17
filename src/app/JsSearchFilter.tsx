import {FC, useState} from "react";
import {FilterProps, ValueType} from "./type/Types";
import '../index.css';
import {useToggleModal} from "./hook/useToggleModal";
import FilterIcon from "./uitls/FilterIcon";
import Modal from "./uitls/Modal";




const JsSearchFilter: FC<FilterProps> =({filter =[], onSearch=undefined})=>{

    const [values, setValue] =useState<ValueType | null>(null)

    const { isOpen, open, close, toggle } = useToggleModal();

    return (
        <div style={{width:"100%"}}>
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
            { isOpen && <Modal close={close} /> }

            { values &&
            <div className={`no-scroll`} style={{width:'100%', background:'green' , overflowY:'auto', padding:'5px 0'}} >

            </div>
            }
        </div>
    )
}
export default JsSearchFilter;