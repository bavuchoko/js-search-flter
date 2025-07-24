import {FC, useCallback, useMemo} from "react";
import {ObjectType, OptionProps} from "../type/Types";
import OptionIcons from "../resources/svg/OptionIcons";
import {useChecked} from "../hook/useChecked";
import {useDataHandler} from "../hook/useDataHandler";


const GroupOptionData: FC<OptionProps> = ({ element, handle, clicked, values }) => {
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
        return checkIncludes(values ?? {}, keys[0], element.id);
    }, [checkIncludes, values, keys, element.id, clicked]);

    const onClick = useCallback(() => {
        if (clicked && keys.length > 0) {
            handle?.(keys[0], element.id, undefined);
        }
    }, [clicked, keys, handle, element.id]);

    return (
        <div
            className={`no-drag ${checked ? "js-search-checked" : ""}`}
            style={{
                marginBottom: "6px",
                width: "calc(50% - 4px)",
                display: "flex",
                padding: "4px 12px",
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
                        style={{ marginRight: "8px" , }}
                    >
            {getNestedValue(element, el)}
          </span>
                ))
            ) : (
                <span style={{ marginRight: "8px" }}>{element.name}</span>
            )}
        </div>
    );
};

export default GroupOptionData;
