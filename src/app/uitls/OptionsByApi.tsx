import {OptionProps, SearchTypes} from "../type/Types";
import React, {FC, useEffect, useRef, useState} from "react";
import useDragScroll from "../hook/useDragScroll";
import GroupOptionData from "./GroupOptionData";
import Pagination from "./Pagination";


const OptionsByApi:FC<OptionProps> = ({ handle, clicked, remove, values })=>{

    const optionsRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<SearchTypes | null>(null)
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    useEffect(() => {
        if (selected === null) {
        } else {
        }
    }, [selected]);

    useDragScroll([optionsRef]);

    const clickHandler = (label:SearchTypes) =>{

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
                            key={el.label}
                            className={`js-search-api-each ${selected?.label === el.label && 'js-search-api-selected'}`}
                            onClick={() => clickHandler(el)}
                        >{el.label}</div>
                    )
                })}
                </div>
            </div>

            {/* 조회결과 보이는 곳 */}
            <div style={{width: '100%', height: '320px', position:'relative', overflowX:"hidden",}}>

                <div style={{height: clicked?.data?.page  ? '290px' : '320', padding: '6px 0', overflowY: drawerOpen ? 'hidden' : 'auto',}}>
                    {clicked?.data?.contents?.map((el) => (
                        <GroupOptionData
                            key={el.id ?? el.key ?? el.name}
                            element={el}
                            handle={handle}
                            clicked={clicked}
                            values={values}
                        />
                    ))}

                    {/*드로어*/}
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: drawerOpen ? 0 : '-400px',
                            width: '400px',
                            height: '320px',
                            backgroundColor: 'white',
                            boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
                            transition: 'left 0.1s ease-in-out',
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

                {/*페이지네이션*/}
               <Pagination page={clicked?.data?.page} onPageChange={ selected ? selected?.listener: clicked?.data?.listener}/>

            </div>



        </div>
    )
}
export default OptionsByApi