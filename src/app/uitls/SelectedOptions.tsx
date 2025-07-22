import React, { FC, RefObject } from "react";
import {Filter, ObjectType, ValueType} from "../type/Types";
import OptionIcons from "./OptionIcons";

interface Props {
    filter: Filter[];
    values: ValueType | null;
    handle?: (key: string | string[], val: any, type?: "only" | "date") => void;
    recursiveFind: (data: any, id: number) => any;
    containerRef?: RefObject<HTMLDivElement | null>;
    reset?: () => void;
}

const SelectedOptions: FC<Props> = ({
                                        filter,
                                        values,
                                        handle,
                                        recursiveFind,
                                        containerRef,
                                        reset,
                                    }) => (
    <div
        style={{
            height: "42px",
            background: "var(--background)",
            width: "100%",
            padding: "12px 8px",
            display: "flex",
            justifyContent: "space-between",
        }}
    >
        <div ref={containerRef} className="no-scroll js-search-selected-options">
            {filter.flatMap((f) => {

                const keys: string[] = Array.isArray(f.key)
                    ? f.key.map((k: ObjectType) => k.key.toString())
                    : [f.key];

                // 여러 key 값들의 선택된 항목을 모두 합친다.
                const allVals: any[] = [];
                keys.forEach((key) => {
                    const val = values?.[key];
                    if (Array.isArray(val)) {
                        allVals.push(...val);
                    }
                });

                if (allVals.length === 0) return [];

                return allVals.map((id) => {
                    const el = f.recursive ? recursiveFind(f.data, id) : f.data.find((d) => d.id === id);
                    const name = el ? el.name : id;
                    const dataType = f.recursive ? "only" : f.type === "date" ? "date" : undefined;
                    const keys: string[] = Array.isArray(f?.key)
                        ? f!.key.map((k: ObjectType) => k.key.toString())
                        : f?.key ? [f.key] : [];
                    return (
                        <div
                            key={`${Array.isArray(f.key) ? f.key.join(",") : f.key}-${id}`}
                            className="each-options"
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => handle?.(keys, id, dataType)}
                        >
                            <OptionIcons style={{ width: "18px", height: "18px" }} type={f.type} checked={false} />
                            <span className="no-drag">[{f.label}]</span>
                            <span className="no-drag" style={{ marginLeft: "6px" }}>
                {name}
              </span>
                            <button style={{ marginTop: "2px" }}>
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line x1="5" y1="5" x2="19" y2="19" stroke="black" strokeWidth="1" />
                                    <line x1="19" y1="5" x2="5" y2="19" stroke="black" strokeWidth="1" />
                                </svg>
                            </button>
                        </div>
                    );
                });
            })}
        </div>

        <div className="js-search-reset-modal" onClick={reset}>
            <button>
                <span>초기화</span>
            </button>
        </div>
    </div>
);

export default SelectedOptions;
