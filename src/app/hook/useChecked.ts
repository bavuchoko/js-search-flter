import {ValueType} from "../type/Types";

/**
 * 배열이 string[] 인지 검사
 */
function isStringArray(val: unknown): val is string[] {
    return Array.isArray(val) && val.every(item => typeof item === 'string');
}

/**
 * 배열이 number[] 인지 검사
 */
function isNumberArray(val: unknown): val is number[] {
    return Array.isArray(val) && val.every(item => typeof item === 'number');
}

/**
 * 선택 값이 포함되어 있는지 검사하는 훅
 */
export function useChecked() {
    function checkIncludes(
        values: ValueType = {},
        target: string,
        optionId: string | number
    ): boolean {
        const targetValue = values[target];

        if (isStringArray(targetValue) && typeof optionId === 'string') {
            return targetValue.includes(optionId);
        }

        if (isNumberArray(targetValue) && typeof optionId === 'number') {
            return targetValue.includes(optionId);
        }

        return false;
    }

    return { checkIncludes };
}
