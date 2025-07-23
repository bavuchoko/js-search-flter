import { Filter, ObjectType, ValueType } from "../type/Types";
import React, { FC, useMemo, useCallback } from "react";
import TrashIcon from "../resources/svg/TrashIcon";

type Props = {
    handle?: (key: string, val: any, type?: "only" | "date" | undefined) => void;
    remove?: (key: string, val: any, type?: "only" | "date" | undefined) => void;
    clicked?: Filter;
    values?: ValueType | null;
};

const DateSelector: FC<Props> = ({ handle, clicked, remove, values }) => {
    const { labels, keys } = useMemo(() => {
        if (!clicked || !clicked.key) {
            return { labels: [], keys: [] };
        }
        if (Array.isArray(clicked?.key)) {
            return {
                labels: clicked.key.map((k: ObjectType) => k.label.toString()),
                keys: clicked.key.map((k: ObjectType) => k.key.toString()),
            };
        }
        return {
            labels: clicked?.key ? [clicked.key] : [],
            keys: clicked?.key ? [clicked.key] : [],
        };
    }, [clicked?.key]);

    const handleChange = useCallback(
        (key: string, field: "startDate" | "endDate", value: string) => {
            const prev = values?.[key];
            if (prev && typeof prev === "object") {
                const newVal = { ...prev, [field]: value };
                handle?.(key, newVal, "date");
            } else {

                const newVal = { [field]: value };
                handle?.(key, newVal, "date");
            }
        },
        [handle, values]
    );


    const handleRemove = useCallback(
        (key: string) => {
            remove?.(key, undefined, "date");
        },
        [remove]
    );

    return (
        <div>
            {labels.map((label, index) => {
                const key = keys[index];
                const val = values?.[key];
                return (
                    <div
                        key={key || index}
                        style={{ borderBottom: "1px solid var(--innerBorder)", paddingBottom: "20px" }}
                    >
                        <p style={{ fontWeight: "bold" }}>{label}</p>
                        <div
                            style={{
                                borderBottom: "1px solid var(--innerBorder)",
                                paddingBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <input
                                    className="js-search-date"
                                    type="date"
                                    value={(val as ObjectType)?.startDate || ""}
                                    onChange={(e) => handleChange(key, "startDate", e.target.value)}
                                />
                                <span style={{ marginLeft: "5px", marginRight: "5px" }}></span>
                                <input
                                    className="js-search-date"
                                    type="date"
                                    value={(val as ObjectType)?.endDate || ""}
                                    onChange={(e) => handleChange(key, "endDate", e.target.value)}
                                />
                            </div>
                            <TrashIcon
                                style={{ width: "17px", height: "17px", cursor: "pointer" }}
                                onClick={() => handleRemove(key)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DateSelector;
