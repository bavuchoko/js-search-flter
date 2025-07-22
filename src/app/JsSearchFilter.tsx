import React, {FC, useRef, useState} from "react";
import {Filter, FilterProps} from "./type/Types";
import '../index.css';
import {useFilterHandle} from "./hook/useToggleModal";
import FilterIcon from "./uitls/FilterIcon";
import Modal from "./uitls/Modal";
import {useToggleModal} from "./hook/useFilterHandle";
import useDragScroll from "./hook/useDragScroll";
import OptionIcons from "./uitls/OptionIcons";
import {useDataHandler} from "./hook/useDataHandler";

/**
 *
 *
 * */
const JsSearchFilter: FC<FilterProps> =({filter =[], onValueChange=undefined, onSearch=undefined, onApiRequest=undefined})=>{

    const [clicked, setClicked] = useState<Filter | null>(null)
    const {recursiveFind} = useDataHandler();

    const { isOpen, open, close, toggle } = useToggleModal();
    const {         values,
        handleMulti,
        handleSingle,
        reset,
        multiToggle,
        singular, } = useFilterHandle(onValueChange);
    const groupRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    useDragScroll([groupRef, optionsRef]);

    return (
        <div style={{width:"100%"}}>
            <div style={{display:'flex', padding:'3px',  position: 'relative',}} className={`  ${values? 'js-search-has-value' :''}`}>
                <FilterIcon
                    style={{
                        width:'27px',
                        height:'27px',
                        padding:'4px',
                        cursor:'pointer',
                        border:'1px solid',
                        borderColor: 'var(--border)',
                        borderRadius:'2px',
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
                    {filter.map(el=> {
                        const selected = values?.[el.key];
                        let count: number | undefined = undefined;

                        if (selected !== undefined) {
                            if (Array.isArray(selected)) {
                                count = selected.length;
                            } else {
                                count = 1;
                            }
                        }
                        return (<span
                                data-id={el.key}
                                style={{
                                    padding: '4px 8px',
                                    position:'relative',
                                    margin: '0 5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    fontSize: '12px',
                                    alignItems: 'center',
                                    color: 'var(--grayText)',
                                    borderRadius: '2px',
                                    border: '1px solid var(--border)',
                                    // borderColor: count ? 'var(--red)' : 'var(--border)',
                                }}
                                onClick={() => {
                                    setClicked(el);
                                    toggle();
                                }}
                            >{el.label}
                        {count !== undefined && <span
                            style={{
                                position: 'absolute',
                                top: '1px',
                                right: '-7px',
                                background: 'red',
                                borderRadius: '50%',
                                lineHeight: '13px',
                                color: 'white',
                                width: '13px',
                                height: '13px',
                                fontSize: '9px',
                                textAlign: 'center',
                                display: 'inline-block',
                                marginLeft: '3px'
                            }}
                        >{count}</span> }
                        </span>
                        )

                    })}


                </div>
            </div>

            { isOpen && <Modal close={close} filter={filter} values={values} multiHandler={handleMulti} singleHandler={handleSingle} reset={reset} clicked={clicked} setClicked={setClicked} onSearch={onSearch}/> }


            <div
                style={{
                    height:'42px',
                    background:'var(--background)',
                    width:'100%',
                    padding:'12px 0',
                    display:'flex',
                    justifyContent:'space-between',
                }}>
                {values && (
                    <>
                        <div
                            ref={optionsRef}
                            className={`no-scroll js-search-selected-options`}
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
                                                if(f.recursive) handleSingle?.(f.key, Number(id))
                                                else handleMulti?.(f.key, Number(id))
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

        </div>
    )
}
export default JsSearchFilter;