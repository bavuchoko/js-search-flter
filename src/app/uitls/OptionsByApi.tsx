import {OptionProps} from "../type/Types";
import React, {FC, useRef, useState} from "react";
import useDragScroll from "../hook/useDragScroll";
import GroupOptionData from "./GroupOptionData";


const OptionsByApi:FC<OptionProps> = ({ handle, clicked, remove, values })=>{

    const optionsRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState()

    useDragScroll([optionsRef]);
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
                    className={`js-search-api-each-first`}
                >전체</div>

                <div
                    className="no-scroll js-search-selected-options"
                    ref={optionsRef}
                >

                {clicked?.searchBy?.map(el => {
                    return (
                        <div
                            className={`js-search-api-each`}
                        >{el.label}</div>
                    )
                })}
                </div>
            </div>

            {/* 조회결과 보이는 곳 */}
            <div style={{width:'100%', height:'323px', padding:'6px 0'}}>
                { clicked?.data.map((el) => (
                        <GroupOptionData
                            key={el.id ?? el.key ?? el.name}
                            element={el}
                            handle={handle}
                            clicked={clicked}
                            values={values}
                        />
                ))}
            </div>

            {/*드로어*/}

        </div>
    )
}
export default OptionsByApi