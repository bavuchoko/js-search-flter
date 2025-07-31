import React, { FC, RefObject, useCallback } from "react";
import { Filter, ObjectType, ValueType } from "../type/Types";
import OptionIcons from "../resources/svg/OptionIcons";
import {getLabelAndName} from "./filterHelper";

interface Props {
    filter: Filter[];
    values?: ValueType | null;
    remove?: (key: string, val: any, type?: "only" | "date") => void;
    recursiveFind: (data: any, id: number) => any;
    containerRef?: RefObject<HTMLDivElement | null>;
    reset?: () => void;
    modal?:boolean;
}

const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yy}.${mm}.${dd}`;
};

const getAllVals = (f: Filter, values: ValueType | null | undefined) => {
    const keys: string[] = Array.isArray(f.key)
        ? f.key.map((k: ObjectType) => k.key.toString())
        : [f.key];

    const allVals: any[] = [];
    keys.forEach((key) => {
        const val = values?.[key];
        if (Array.isArray(val)) {
            allVals.push(...val);
        } else if(val){
            allVals.push({ [key]: val });
        }
    })
    return allVals;
};


const SelectedOptions: FC<Props> = ({
                                        filter,
                                        values,
                                        remove,
                                        recursiveFind,
                                        containerRef,
                                        reset,
                                        modal
                                    }) => {
    const renderOptions = useCallback(() => {
        return filter.flatMap((f) => {
            const allVals = getAllVals(f, values);
            if (allVals.length === 0) return [];

            return allVals.map((val) => {

                const { label, name, keyName } = getLabelAndName(f, val, recursiveFind);
                const dataType = f.recursive ? "only" : f.type === "date" ? "date" : undefined;

                return (
                    <div
                        key={`${Array.isArray(f.key) ? f.key.join(",") : f.key}-${JSON.stringify(val)}`}
                        className="each-options"
                        style={{ display: "flex", alignItems: "center" ,}}
                        onClick={() => remove?.((keyName as string), val, dataType)}
                    >
                        <OptionIcons style={{ width: "18px", height: "18px" }} type={f.type} checked={false} />
                        <span className="no-drag" style={{marginLeft:1}}>[{label}]</span>
                        <span className="no-drag" style={{ marginLeft: 4 }}>
                          {name}
                        </span>

                        <button style={{ marginLeft: 2 }}>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"

                            >
                                <line x1="5" y1="5" x2="19" y2="19" stroke="var(--jf-red)" strokeWidth="1" />
                                <line x1="19" y1="5" x2="5" y2="19" stroke="var(--jf-red)" strokeWidth="1" />
                            </svg>
                        </button>
                    </div>
                );
            });
        });
    }, [filter, values, remove, recursiveFind]);

    return (
        <div
            style={{
                height: '3rem',
                borderTop: modal ? '1px solid var(--jf-innerBorder)' :'none',
                background: "var(--jf-background)",
                width: "100%",
                padding: "12px 8px",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <div ref={containerRef} className="no-scroll js-search-selected-options">
                {renderOptions()}
            </div>

            <div className="js-search-reset-modal" onClick={reset}>
                <button>
                    <span>초기화</span>
                </button>
            </div>
        </div>
    );
};

export default SelectedOptions;
