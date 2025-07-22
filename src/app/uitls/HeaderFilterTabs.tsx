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
                padding: "0 12px",
                display: 'flex',
                alignItems: 'flex-end',
                width: '100%',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
            }}
            ref={containerRef}
        >
            {filter.map(el => {
                const selected = values?.[el.key];
                const count = Array.isArray(selected) ? selected.length : selected ? 1 : undefined;

                return (
                    <span
                        key={el.key}
                        data-id={el.key}
                        className={`tab`}
                        style={{
                            display: 'flex',
                            boxSizing: 'border-box',
                            padding: modal? '8px 2px' : '4px 8px',
                            height:'100%',
                            alignItems: 'center',
                            position: 'relative',
                            margin: modal? '0 3px' : '0 5px',
                            cursor: 'pointer',
                            fontWeight: modal? ( clicked? 'normal' : 'bold') : 'normal',
                            fontSize: modal? '13px' : '12px',
                            borderRadius: '2px',
                            border: modal? 'none' : '1px solid var(--border)',
                            borderBottom: modal ? (clicked?.label === el.label ? '2px solid black' : '2px solid white') :  '1px solid var(--border)',
                            color: modal ? (clicked?.label === el.label ? 'black' : 'var(--grayText)') : 'var(--grayText)',
                        }}
                        onClick={() => {
                            setClicked?.(el);
                            toggle?.();
                        }}
                    >
                        {el.label}
                        {count && (
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
                            >
                {count}
              </span>
                        )}
          </span>
                );
            })}
        </div>
    );
};

export default HeaderFilterTabs;
