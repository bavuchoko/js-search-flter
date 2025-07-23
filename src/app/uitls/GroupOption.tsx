import GroupOptionData from "./GroupOptionData";
import React, { FC, useState } from "react";
import { Filter, ValueType } from "../type/Types";
import RecursiveTree from "./RecursiveTree";
import DateSelector from "./DateSelector";

type GroupProps = {
    clicked?: Filter | null;
    handle?: (key: string, val: any, type?: "only" | "date" | undefined) => void;
    remove?: (key: string, val: any, type?: "only" | "date" | undefined) => void;
    searchButton?: boolean;
    values?: ValueType | null;
};

const GroupOption: FC<GroupProps> = ({
                                         clicked,
                                         handle,
                                         remove,
                                         searchButton,
                                         values,
                                     }) => {
    const [expanded, setExpanded] = useState<number[] | null>([]);

    if (!clicked) return null;

    const isDateType = clicked.type === "date";
    const isRecursive = clicked.recursive;
    const data = clicked.data ?? [];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                fontSize: "13px",
                height: searchButton ? "360px" : "417px",
                padding: "8px 0",
                overflowY: "auto",
                alignContent: "flex-start",
            }}
        >
            {isDateType && (
                <div style={{ width: "100%", height: "100%", padding: "4px 16px" }}>
                    <DateSelector
                        clicked={clicked}
                        values={values}
                        handle={handle}
                        remove={remove}
                    />
                </div>
            )}

            {isRecursive && (
                <div style={{ width: "100%", height: "100%" }}>
                    <RecursiveTree
                        expanded={expanded}
                        setExpanded={setExpanded}
                        clicked={clicked}
                        data={data}
                        values={values}
                        handle={handle}
                    />
                </div>
            )}

            {!isRecursive &&
                data.map((el) => (
                    <GroupOptionData
                        key={el.id ?? el.key ?? el.name}
                        option={el}
                        handle={handle}
                        clicked={clicked}
                        values={values}
                    />
                ))}
        </div>
    );
};

export default GroupOption;
