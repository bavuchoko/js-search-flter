import {OptionProps} from "../type/Types";
import React, {FC, useEffect, useRef, useState} from "react";
import useDragScroll from "../hook/useDragScroll";
import GroupOptionData from "./GroupOptionData";


const OptionsByApi:FC<OptionProps> = ({ handle, clicked, remove, values })=>{

    const optionsRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<string | null>(null)
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        if (selected === null) {
        } else {
        }
    }, [selected]);

    useDragScroll([optionsRef]);

    const clickHandler = (label:string) =>{

        setSelected(label)
        setDrawerOpen(true)
    }
    return (
        <div style={{width:'100%', }}>

            {/*선택옵션*/}
            <div
                style={{
                    width: '100%',
                    height: '',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    border: '1px solid var(--innerBorder)'
                }}
            >

                <div
                    style={{fontWeight: selected===null ? 'bold':'normal'}}
                    className={`js-search-api-each-first`}
                    onClick={() => setSelected(null)}
                >전체</div>

                <div
                    className="no-scroll js-search-selected-options"
                    ref={optionsRef}
                >

                {clicked?.searchBy?.map(el => {
                    return (
                        <div
                            className={`js-search-api-each ${selected === el.label && 'js-search-api-selected'}`}
                            onClick={() => clickHandler(el.label)}
                        >{el.label}</div>
                    )
                })}
                </div>
            </div>

            {/* 조회결과 보이는 곳 */}
            <div style={{width: '100%', height: '323px', padding: '6px 0', position:'relative', overflowX:"hidden", overflowY: drawerOpen ? 'hidden' : 'auto',}}>
                {clicked?.data.map((el) => (
                    <GroupOptionData
                        key={el.id ?? el.key ?? el.name}
                        element={el}
                        handle={handle}
                        clicked={clicked}
                        values={values}
                    />
                ))}


                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: drawerOpen ? 0 : '-400px',
                        width: '400px',
                        height: '323px',
                        backgroundColor: 'white',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
                        transition: 'left 0.3s ease-in-out',
                        zIndex: 1000,
                        padding: '16px',
                    }}
                >
                    <div style={{textAlign: 'right'}}>
                        <button onClick={() => setDrawerOpen(false)}>x</button>
                    </div>

                    {/* 여기에 drawerData 표시 */}
                    <div>
                        sef
                        {/* 필요한 세부 내용 추가 */}
                    </div>
                </div>
            </div>

            {/*드로어*/}

        </div>
    )
}
export default OptionsByApi