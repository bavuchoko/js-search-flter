import React, {FC, useRef, useState} from "react";
import {Filter, FilterProps} from "./type/Types";
import '../index.css';
import {useFilterHandle} from "./hook/useToggleModal";
import FilterIcon from "./resources/svg/FilterIcon";
import Modal from "./uitls/Modal";
import {useToggleModal} from "./hook/useFilterHandle";
import useDragScroll from "./hook/useDragScroll";
import {useDataHandler} from "./hook/useDataHandler";
import HeaderFilterTabs from "./uitls/HeaderFilterTabs";
import SelectedOptions from "./uitls/SelectedOptions";
import '../index.css';

const JsSearchFilter: FC<FilterProps> = ({
                                             filter = [],
                                             onValueChange = undefined,
                                             onSearch = undefined,
                                             initialValues,
                                         }) => {
    const [clicked, setClicked] = useState<Filter | null>(null);
    const { recursiveFind } = useDataHandler();
    const { isOpen, toggle, close } = useToggleModal();

    const { values, handle, reset, remove } = useFilterHandle(onValueChange, initialValues);

    const groupRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    useDragScroll([groupRef, optionsRef]);

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: 'flex', padding: '3px', position: 'relative' }} className={`${values ? 'js-search-has-value' : ''}`}>
                <FilterIcon
                    style={{
                        width: '27px',
                        height: '27px',
                        padding: '4px',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'var(--border)',
                        borderRadius: '2px',
                    }}
                    onClick={toggle}
                />

                <HeaderFilterTabs
                    filter={filter}
                    values={values}
                    clicked={clicked}
                    setClicked={setClicked}
                    toggle={toggle}
                    containerRef={groupRef}
                />
            </div>

            {isOpen && (
                <Modal
                    close={close}
                    filter={filter}
                    values={values}
                    handle={handle}
                    remove={remove}
                    reset={reset}
                    clicked={clicked}
                    setClicked={setClicked}
                    onSearch={onSearch}
                />
            )}

            {values ? (
                <SelectedOptions
                    filter={filter}
                    values={values}
                    remove={remove}
                    recursiveFind={recursiveFind}
                    containerRef={optionsRef}
                    reset={reset}
                />
            )
            :
            <div style={{background:'white', width:'100%', height:'3rem'}} ></div>
            }
        </div>
    );
};

export default JsSearchFilter;
