import { FC, useMemo, useCallback } from "react";
import { Filter, ObjectType, ValueType } from "../type/Types";
import OptionIcons from "../resources/svg/OptionIcons";
import { useChecked } from "../hook/useChecked";
import { useDataHandler } from "../hook/useDataHandler";

type OptionProps = {
    option: any; // 가능하면 타입 구체화 권장
    handle?: (key: string, val: any, type?: "only" | "date" | undefined) => void;
    clicked?: Filter;
    values?: ValueType | null;
};

const GroupOptionData: FC<OptionProps> = ({ option, handle, clicked, values }) => {
    const { checkIncludes } = useChecked();
    const { getNestedValue } = useDataHandler();

    const keys: string[] = useMemo(() => {
        if (!clicked) return [];
        if (Array.isArray(clicked.key)) {
            return clicked.key.map((k: ObjectType) => k.key.toString());
        }
        return clicked.key ? [clicked.key.toString()] : [];
    }, [clicked]);

    const checked = useMemo(() => {
        if (!clicked || !keys.length) return false;
        return checkIncludes(values ?? {}, keys[0], option.id);
    }, [checkIncludes, values, keys, option.id, clicked]);

    const onClick = useCallback(() => {
        if (clicked && keys.length > 0) {
            handle?.(keys[0], option.id, undefined);
        }
    }, [clicked, keys, handle, option.id]);

    return (
        <div
            className={`no-drag ${checked ? "js-search-checked" : ""}`}
            style={{
                marginBottom: "6px",
                width: "calc(50% - 4px)",
                display: "flex",
                paddingLeft: "16px",
                paddingRight: "16px",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <OptionIcons style={{ width: "18px", height: "18px" }} type={clicked?.type} checked={checked} />
            {clicked?.target ? (
                clicked.target.map((el, index) => (
                    <span
                        key={index}
                        className={`${clicked.key}-${el.replace(".", "-")}`}
                        style={{ marginRight: "8px" }}
                    >
            {getNestedValue(option, el)}
          </span>
                ))
            ) : (
                <span style={{ marginRight: "8px" }}>{option.name}</span>
            )}
        </div>
    );
};

export default GroupOptionData;
