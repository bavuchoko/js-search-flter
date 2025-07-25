import GroupOptionData from "./GroupOptionData";
import React, { FC, useState } from "react";
import {DrawerState, Filter, ValueType} from "../type/Types";
import RecursiveTree from "./RecursiveTree";
import DateSelector from "./DateSelector";
import {getType} from "./filterHelper";
import OptionsByApi from "./OptionsByApi";

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
    const [drawerOpen, setDrawerOpen] = useState<DrawerState | undefined>("closed");

    if (!clicked) return null;

    const contentType =  getType(clicked);
    const data = clicked.data?.contents ?? [];
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: "13px",
                position:'relative',
                height: searchButton ? "360px" : "417px",
                overflowY: drawerOpen? 'hidden' : "auto",
                alignContent: "flex-start",
                padding: contentType==='data' ? '6px 0': '0 0'
            }}
        >

            { contentType==='api' &&
                    <OptionsByApi
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        clicked={clicked}
                        values={values}
                        handle={handle}
                        remove={remove}
                    />
            }


            {contentType==='date' && (
                <div style={{ width: "100%", height: "100%", padding: "4px 16px" }}>
                    <DateSelector
                        clicked={clicked}
                        values={values}
                        handle={handle}
                        remove={remove}
                    />
                </div>
            )}

            {contentType==='recursive'  && (
                <div style={{ width: "100%", height: "100%" }}>
                    <RecursiveTree
                        expanded={expanded}
                        setExpanded={setExpanded}
                        clicked={clicked}
                        elements={data}
                        values={values}
                        handle={handle}
                    />
                </div>
            )}

            { contentType==='data' &&
                data.map((el) => (
                    <GroupOptionData
                        key={el.id ?? el.key ?? el.name}
                        element={el}
                        handle={handle}
                        clicked={clicked}
                        values={values}
                    />
                ))}
        </div>
    );
};

export default GroupOption;
