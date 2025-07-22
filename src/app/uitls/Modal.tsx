import React, {FC, useEffect, useRef} from "react";
import CloseIcon from "./CloseIcon";
import {COLORS, Filter, ValueType} from "../type/Types";
import useDragScroll from "../hook/useDragScroll";
import GroupOption from "./GroupOption";
import {useChecked} from "../hook/useChecked";
import OptionIcons from "./OptionIcons";
import {useDataHandler} from "../hook/useDataHandler";

type ModalProps ={
    close?:()=>void;
    filter?: Filter[];
    values?: ValueType | null;
    multiHandler?: (key: string, val: number) => void;
    singleHandler?: (key: string, val: number) => void;
    reset?: () => void;
    clicked?:Filter | null;
    setClicked?:(click:Filter) =>void;
    onSearch?:(values: ValueType | null )=>void;
}

const Modal:FC<ModalProps> =({close=undefined, filter, values, multiHandler, singleHandler, reset, clicked,setClicked, onSearch})=>{


    const optionsRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<HTMLDivElement>(null);

    useDragScroll([optionsRef, groupRef]);
    const {recursiveFind} = useDataHandler();


    useEffect(() => {
        if (groupRef.current && clicked) {
            const container = groupRef.current;
            const el = container.querySelector(`[data-id="${clicked.key}"]`);
            if (el) {
                const element = el as HTMLElement;
                const left = element.offsetLeft;
                container.scrollTo({ left, behavior: 'smooth' });
            }
        }else{
            if (!clicked && filter && filter.length > 0) {
                setClicked?.(filter[0]);
            }
        }
    }, [clicked]);

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
                    width:'400px',
                    height:'550px',
                    borderRadius:'3px',
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
                        {filter?.map((el, index)=>{
                            const color = COLORS[index % COLORS.length];
                            const selected = values?.[el.key];
                            let count: number | undefined = undefined;

                            if (selected !== undefined) {
                                if (Array.isArray(selected)) {
                                    count = selected.length;
                                } else {
                                    count = 1;
                                }
                            }

                            return (
                            <span
                                data-id={el.key}
                                style={{
                                    padding:'8px 2px',
                                    margin:'0 3px',
                                    cursor:'pointer',
                                    fontWeight:clicked?.label === el.label ? 'bold' : 'normal',
                                    fontSize:'13px',
                                    borderBottom: clicked?.label === el.label ? '2px solid black' : '2px solid white',
                                    // color: clicked?.label === el.label ? 'black' : color,
                                    color: clicked?.label === el.label ? 'black' : 'var(--grayText)',

                                }}
                                onClick={()=>{setClicked?.(el)}}
                            >{el.label}
                                {count !== undefined && <span style={{display:'inline-block', marginLeft:'3px', }}>{count}</span> }
                            </span>
                        )})}
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

                                {filter?.flatMap((f, index) => {
                                    const val = values[f.key];
                                    if (!Array.isArray(val)) return [];

                                    const type = f.type;
                                    const label = f.label;
                                    // const color = COLORS[index % COLORS.length];

                                    return val.map(id => {
                                        const el = f.recursive ? recursiveFind(f.data, id) : f.data.find(d => d.id === id);
                                        const name = el ? el.name : id;
                                        const handler = f.recursive ? singleHandler : multiHandler;
                                        return (
                                            <div
                                                key={`${f.key}-${id}`}
                                                className="each-options"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    margin: "4px 0",
                                                }}
                                                onClick={() => {
                                                    handler?.(f.key, Number(id))
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center" }}>

                                                    <OptionIcons
                                                        // style={{ width: "18px", height: "18px",color:color}}
                                                        style={{ width: "18px", height: "18px"}}
                                                        type={type}
                                                        checked={false}
                                                    />
                                                    <span className=" no-drag" >[{label}]</span>

                                                    <span className=" no-drag" style={{ marginLeft: "6px" }}>{name}</span>
                                                </div>
                                                <button>
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <line
                                                            x1="5"
                                                            y1="5"
                                                            x2="19"
                                                            y2="19"
                                                            stroke="black"
                                                            strokeWidth="1"
                                                        />
                                                        <line
                                                            x1="19"
                                                            y1="5"
                                                            x2="5"
                                                            y2="19"
                                                            stroke="black"
                                                            strokeWidth="1"
                                                        />
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

            {/* 조회된 옵션값 */}

            <GroupOption clicked={clicked} multiHandler={multiHandler} singleHandler={singleHandler} searchButton={ onSearch ? true : false } values={values}/>

            {onSearch &&
                <div
                    style={{
                        height: '70px',
                        borderTop:'1px solid var(--innerBorder)',
                        padding:'12px 16px'
                    }}
                >
                    <button
                        className={`active js-search-button`}
                        style={{
                            width:'100%',
                            height:'100%',
                            background:'var(--blue)',
                            border:'none',
                            borderRadius:'4px',
                            color:'black',
                            cursor:'pointer',
                        }}
                        onClick={()=>onSearch?.(values ?? null)}
                    >검색하기</button>
                </div>
            }
            </div>
        </>
    )
}
export default Modal;