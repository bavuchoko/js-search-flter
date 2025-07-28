import {OptionProps, SearchTypes} from "../type/Types";
import React, {FC, useEffect, useRef, useState} from "react";
import useDragScroll from "../hook/useDragScroll";
import GroupOptionData from "./GroupOptionData";
import Pagination from "./Pagination";
import SearChDrawer from "./SearChDrawer";



const OptionsByApi:FC<OptionProps> = ({ handle, clicked, remove, values, drawerOpen, setDrawerOpen })=>{
    const optionsRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<SearchTypes | null>(null)
    const [show, setShow] = useState<SearchTypes | null>(null)


    useEffect(() => {
        if (selected === null) {
        } else {
        }
    }, [selected]);

    useDragScroll([optionsRef]);

    const clickHandler = (label: SearchTypes) => {

        if (show?.label === label.label) {
            setDrawerOpen?.("closing");
            setShow(null);
        } else {
            setDrawerOpen?.("closing");
            setTimeout(() => {
                setShow(label);
                setDrawerOpen?.("opening");
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

    const closeDrawerHandler =()=>{
        setDrawerOpen?.("closing");
        setShow(null)
    }

    return (
        <div style={{width:'100%', height:'360px' }}>

            {/*선택옵션*/}
            <div
                className={`efsefsefsefsfe`}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 12px',
                    borderBottom: '1px solid var(--innerBorder)'
                }}
            >

                <div
                    style={{fontWeight: selected===null ? 'bold':'normal', cursor:'pointer'}}
                    className={`js-search-api-each-first`}
                    onClick={() => {setDrawerOpen?.("closing"); setSelected(null); } }
                >전체</div>

                <div
                    className="no-scroll js-search-selected-options"
                    ref={optionsRef}
                >

                {clicked?.searchBy?.map(el => {
                    return (
                        <div
                            key={el.label}
                            className={`js-search-api-each ${show?.label === el.label && 'js-search-api-selected'}`}
                            onClick={() => clickHandler(el)}
                        >{el.label}</div>
                    )
                })}
                </div>
            </div>

            {/* 조회결과 보이는 곳 */}
            {/*<div style={{width: '100%', position:'relative', overflowX:"hidden", fontSize:'12px',}}>*/}

                <div style={{display: "flex",
                    flexWrap: "wrap", height: clicked?.data?.page  ? '292px' : '322px', padding: '6px 0', overflowY: drawerOpen ==='opening' ? 'hidden' : 'auto',}}>
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
                <SearChDrawer clicked={clicked} data={show?.data} drawerOpen={drawerOpen} closeDrawerHandler={closeDrawerHandler} handle={handle}/>


                </div>

                {/*페이지네이션*/}
               <Pagination page={clicked?.data?.page} onPageChange={(v)=> pageHandler(v)}/>

            {/*</div>*/}



        </div>
    )
}
export default OptionsByApi