import React, {FC, useEffect, useRef, useState} from "react";
import CloseIcon from "./CloseIcon";
import {Filter, ValueType} from "../type/Types";
import useDragScroll from "../hook/useDragScroll";

type ModalProps ={
    close?:()=>void;
    filter?: Filter[];
    values?: ValueType | null;
    handle?: (key: string, val: number) => void;
    reset?: () => void;
}

const Modal:FC<ModalProps> =({close=undefined, filter, values, handle, reset})=>{

    const [clicked, setClicked] = useState<Filter | null>(null)
    const optionsRef = useRef<HTMLDivElement>(null);
    useDragScroll(optionsRef);


    useEffect(() => {
        if (!clicked && filter && filter.length > 0) {
            setClicked(filter[0]);
        }
    }, [clicked, filter]);
    console.log(values)
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
                        {filter?.map(el=>(
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
                            onClick={()=>{setClicked(el)}}
                        >{el.label}</span>
                        ))}
                </div>

                {/*선택된 조건*/}
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


                    {values && (
                        <>
                            <div
                            ref={optionsRef}
                            className={`no-scroll js-search-modal-selected-options`}
                            >

                                {Object.entries(values).flatMap(([key, val]) => {
                                    const filterForKey = filter?.find(f => f.key === key);
                                    if (!Array.isArray(val) || !filterForKey) return [];

                                    return val.map(id => {
                                        const el = filterForKey.data.find(d => d.id === id);
                                        const name = el ? el.name : id;

                                        return (
                                            <div key={`${key}-${id}`}
                                                 className="each-options"
                                                 style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}
                                                 onClick={() => handle?.(key, Number(id))}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span className="no-drag" style={{ marginRight: '6px' }}>{name}</span>
                                                </div>
                                                <button >
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <line x1="5" y1="5" x2="19" y2="19" stroke="black" strokeWidth="1"/>
                                                        <line x1="19" y1="5" x2="5" y2="19" stroke="black" strokeWidth="1"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        );
                                    });
                                })}


                            </div>
                            <div className={`js-search-reset-modal`} onClick={reset}>
                                <button className={``}>
                                    <span>초기화</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/*선택한 옵션값*/}
                <div>
                    {clicked?.data.map(el => (
                        <div key={el.id} className={`no-drag`} style={{ marginBottom: '6px', fontSize: '14px', display: 'flex', alignItems: 'center', cursor:'pointer' }}
                             onClick={() => handle?.(clicked.key, el.id)}>
                            <span style={{ marginRight: '8px' }}>{el.name}</span>
                            <button
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}

                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="5" y1="5" x2="19" y2="19" stroke="black" strokeWidth="1"/>
                                    <line x1="19" y1="5" x2="5" y2="19" stroke="black" strokeWidth="1"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}
export default Modal;