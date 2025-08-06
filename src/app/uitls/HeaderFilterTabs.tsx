import React, { FC, RefObject } from "react";
import { Filter, ValueType } from "../type/Types";

interface Props {
    filter: Filter[];
    values?: ValueType | null;
    clicked?: Filter | null;
    setClicked?: (filter: Filter) => void;
    toggle?: () => void;
    containerRef?: RefObject<HTMLDivElement | null>;
    modal?: boolean;
}

const HeaderFilterTabs: FC<Props> = ({ filter, values, clicked, setClicked, toggle, containerRef, modal }) => {
    return (
        <div
            className="no-scroll no-drag"
            style={{
                padding: modal ? "0 12px" : 0,
                display: 'flex',
                alignItems: 'flex-end',
                width: '100%',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
            }}
            ref={containerRef}
        >
            {filter.map((el, index) => {

                const keys = Array.isArray(el.key)
                    ? el.key.map(k => k.key)
                    : [el.key];

                let count: number | undefined = undefined;
                keys.forEach((key) => {
                    const selected = values?.[key];
                    const thisCount = Array.isArray(selected) ? selected.length : selected ? 1 : 0;

                    count = (count || 0) +  thisCount;
                    count = count ===0 ? undefined : count;
                });

                return (
                    <span
                        key={Array.isArray(el.key) ? el.key.join(",") : el.key}
                        data-id={el.key}
                        className={`tab`}
                        style={{
                            display: 'flex',
                            boxSizing: 'border-box',
                            padding: modal? '8px 2px' : '4px 8px',
                            height:'100%',
                            alignItems: 'center',
                            position: 'relative',
                            margin: modal? '0 3px' : index===0 ? '0 5px 0 0 ' : '0 5px',
                            cursor: 'pointer',
                            fontWeight: modal? ( clicked? 'normal' : 'bold') : 'normal',
                            fontSize: modal? '13px' : '12px',
                            borderRadius: '2px',
                            border: modal? 'none' : '1px solid var(--jf-darkGray)',
                            borderBottom: modal ? (clicked?.label === el.label ? '2px solid black' : '2px solid white') :  '1px solid var(--jf-darkGray)',
                            color: modal ? (clicked?.label === el.label ? 'black' : 'var(--jf-darkGray)') : 'var(--jf-darkGray)',
                        }}
                        onClick={() => {
                            setClicked?.(el);
                            toggle?.();
                        }}
                    >
                        {el.label}
                        {count  && (
                            modal ?
                            <span style={{ marginLeft:'3px', fontSize:'14px'}}>{count}</span>
                                :
                            <span
                                className='badge'
                                style={{
                                    position: 'absolute',
                                    top: '0',
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
                                    marginLeft: '3px',
                                }}
                            >{count}
                            </span>
                        )}
                    </span>


                );
            })}
        </div>
    );
};

export default HeaderFilterTabs;
