import React, {FC, useState} from "react";
import CloseIcon from "./CloseIcon";
import {Filter} from "../type/Types";

type ModalProps ={
    close?:()=>void;
    filter: Filter[]
}

const Modal:FC<ModalProps> =({close=undefined, filter})=>{

    const [clicked, setClicked] = useState<Filter | null>(null)

    return(
        <>
            <div
                style={{
                    position:'fixed',
                    zIndex:'100',
                    width:'100%',
                    height:'100%',
                    backgroundColor:'var(--modalBackground)',
                    top:'0',
                    left:'0'
                }}
                onClick={close}
            ></div>

            <div
                style={{
                    position:'fixed',
                    zIndex:'101',
                    backgroundColor:'white',
                    width:'480px',
                    height:'580px',
                    borderRadius:'8px',
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%, -50%)',
            }}>
                <div style={{marginTop:'12px'}}>
                    <div style={{padding:'9px 16px', justifyContent:'space-between', display:'flex', fontSize:'16px', fontWeight:'bold'}}>
                        <div className={`no-drag`}>필터</div>
                        <CloseIcon style={{width:'20px', height:"20px"}} onClick={close}/>
                    </div>
                </div>

                {/* 검색조건 */}
                <div
                    className={'no-scroll no-drag'}
                    style={{padding:"0 12px", display:'flex', alignItems:'center', width:'100%', overflowX:'scroll' }}>
                        {filter.map(el=>(
                        <span
                            style={{
                                padding:'8px 2px',
                                margin:'0 3px',
                                cursor:'pointer',
                                fontWeight:clicked?.label === el.label ? 'bold' : 'normal',
                                fontSize:'13px',
                                borderBottom: clicked?.label === el.label ? '2px solid black' : '2px solid white',
                                color: clicked?.label === el.label ? 'black' : 'var(--grayText)',

                            }}
                            onClick={()=>{console.log(clicked); setClicked(el)}}
                        >{el.label}</span>
                        ))}
                </div>

                {/*검색된 조건*/}
                <div
                    style={{
                        height:'42px',
                        background:'var(--background)',
                        width:'100%',
                        padding:'12px 0',
                        borderTop:'1px solid var(--border)',
                        display:'flex',
                        justifyContent:'space-between',
                    }}>
                    <div
                        className={`no-scroll js-search-modal-selected-options`}
                    >

                        <div className={`each-options`}>
                            <div style={{display:'flex', alignItems:'center', padding:'0', margin:'0'}}>
                            {/*<img/>*/}
                            <span className={`no-drag`}>김수한무</span>
                            </div>
                            <button>
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="5" y1="5" x2="19" y2="19" stroke="black" stroke-width="1"/>
                                    <line x1="19" y1="5" x2="5" y2="19" stroke="black" stroke-width="1"/>
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className={`js-search-reset-modal`} >
                        <button className={``}>
                            <span>초기화</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal;