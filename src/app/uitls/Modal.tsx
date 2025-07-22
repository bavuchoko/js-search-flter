import React, { FC, useEffect, useRef } from "react";
import CloseIcon from "./CloseIcon";
import { Filter, ValueType } from "../type/Types";
import useDragScroll from "../hook/useDragScroll";
import { useDataHandler } from "../hook/useDataHandler";
import HeaderFilterTabs from "./HeaderFilterTabs";
import SelectedOptions from "./SelectedOptions";
import GroupOption from "./GroupOption";

type ModalProps = {
    close?: () => void;
    filter?: Filter[];
    values?: ValueType | null;
    handle?: (key: string | string[], val: any, type?: 'only' | 'date') => void;
    reset?: () => void;
    clicked?: Filter | null;
    setClicked?: (click: Filter) => void;
    onSearch?: (values: ValueType | null) => void;
};

const Modal: FC<ModalProps> = ({
                                   close,
                                   filter,
                                   values,
                                   handle,
                                   reset,
                                   clicked,
                                   setClicked,
                                   onSearch,
                               }) => {
    const { recursiveFind } = useDataHandler();
    const groupRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);

    useDragScroll([groupRef, optionsRef]);

    useEffect(() => {
        if (groupRef.current && clicked) {
            const el = groupRef.current.querySelector(`[data-id="${clicked.key}"]`) as HTMLElement;
            if (el) groupRef.current.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
        } else if (!clicked && filter && filter.length > 0) {
            setClicked?.(filter[0]);
        }
    }, [clicked]);

    return (
        <>
            <div
                style={{ position: 'fixed', zIndex: 100, width: '100%', height: '100%', backgroundColor: 'var(--modalBackground)', top: 0, left: 0 }}
                onClick={close}
            />

            <div
                style={{
                    position: 'fixed',
                    zIndex: 101,
                    backgroundColor: 'white',
                    width: '400px',
                    height: '550px',
                    borderRadius: '3px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div style={{ padding: '9px 16px', display: 'flex', justifyContent: 'space-between' }}>
                    <div className="no-drag" style={{ fontWeight: 'bold', fontSize: '16px' }}>필터</div>
                    <CloseIcon style={{ width: '20px', height: "20px" }} onClick={close} />
                </div>

                <HeaderFilterTabs
                    filter={filter || []}
                    values={values}
                    clicked={clicked}
                    setClicked={setClicked}
                    containerRef={groupRef}
                    modal={true}
                />

                {values && (
                    <SelectedOptions
                        filter={filter || []}
                        values={values}
                        handle={handle}
                        recursiveFind={recursiveFind}
                        containerRef={optionsRef}
                        reset={reset}
                    />
                )}

                <GroupOption clicked={clicked} handle={handle} searchButton={!!onSearch} values={values} />

                {onSearch && (
                    <div style={{ height: '70px', borderTop: '1px solid var(--innerBorder)', padding: '12px 16px' }}>
                        <button
                            className="active js-search-button"
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'var(--blue)',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'black',
                                cursor: 'pointer',
                            }}
                            onClick={() => onSearch?.(values ?? null)}
                        >
                            검색하기
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Modal;
