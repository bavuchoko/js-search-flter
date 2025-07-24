import {OptionProps, SearchTypes} from "../type/Types";
import React, {FC, useEffect, useRef, useState} from "react";
import useDragScroll from "../hook/useDragScroll";
import GroupOptionData from "./GroupOptionData";
import Pagination from "./Pagination";
import SearChDrawer from "./SearChDrawer";

export type DrawerState = "closed" | "opening" | "closing" | "closingInstant";

const OptionsByApi:FC<OptionProps> = ({ handle, clicked, remove, values })=>{
    const optionsRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<SearchTypes | null>(null)
    const [show, setShow] = useState<SearchTypes | null>(null)
    const [drawerOpen, setDrawerOpen] = useState<DrawerState>("closed");

    useEffect(() => {
        if (selected === null) {
        } else {
        }
    }, [selected]);

    useDragScroll([optionsRef]);

    const clickHandler = (label: SearchTypes) => {
        if (selected?.label === label.label) {
            setDrawerOpen("closing");
            setSelected(null);
        } else {
            setDrawerOpen("closed");
            setTimeout(() => {
                setShow(label);
                setDrawerOpen("opening");
            }, 100);
        }
    };

    const pageHandler =(v :number)=>{

        const newPage = {
            ...(clicked?.data?.page ?? {}),
            currentPage: v,
        };
        const result ={
            target:selected,
            page: newPage,
        }
        clicked?.data?.listener?.(result)
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
                    style={{fontWeight: selected===null ? 'bold':'normal', cursor:'pointer'}}
                    className={`js-search-api-each-first`}
                    onClick={() => {setDrawerOpen("closing"); setSelected(null); } }
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

                <div style={{display: "flex",
                    flexWrap: "wrap", height: clicked?.data?.page  ? '290px' : '320', padding: '6px 0', overflowY: drawerOpen ==='opening' ? 'hidden' : 'auto',}}>
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
                    <SearChDrawer data={show?.data} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />


                </div>

                {/*페이지네이션*/}
               <Pagination page={clicked?.data?.page} onPageChange={(v)=> pageHandler(v)}/>

            </div>



        </div>
    )
}
export default OptionsByApi