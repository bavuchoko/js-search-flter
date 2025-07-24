// src/utils/filterHelpers.ts

import { Filter, ObjectType } from "../type/Types";

export const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    const yy = date.getFullYear().toString().slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yy}.${mm}.${dd}`;
};

export const getLabelAndName = (
    f: Filter,
    val: any,
    recursiveFind: (data: any, id: number) => any
) => {
    let name = "";
    let label = f.label;
    let keyName = f.key;

    if (f.type === "date") {

        keyName = Object.keys(val)[0].toString();
        name = `${formatDate(val[keyName]?.startDate)} ~ ${formatDate(
            val[keyName]?.endDate
        )}`;

        if (Array.isArray(f.key)) {
            label = f.key.find((el) => el.key.toString() === keyName)?.label?.toString() ?? "";
        } else if (f.key && typeof f.key === "object" && !Array.isArray(f.key)) {
            label =
                (f.key as ObjectType).key.toString() === keyName
                    ? (f.key as ObjectType).label.toString()
                    : "";
        } else if (typeof f.key === "string") {
            label = f.key === keyName ? f.label : "";
        }
    } else {
        const rawVal = typeof val === "object" && val !== null ? Object.values(val)[0] : val;
        const el = f.recursive
            ? recursiveFind(f.data?.contents, rawVal)
            : f.data?.contents?.find((d) => d.id === rawVal);

        name = el ? el.name : rawVal ?? "";
        label = f.label ?? "";
    }

    return { label, name, keyName };
};


export const getType = (clicked:Filter) =>{
    let contentType: "date" | "recursive" | "api" | "data" = "data";

    if (clicked.type === "date") {
        contentType = "date";
    } else if (clicked.recursive) {
        contentType = "recursive";
    } else if (Boolean(clicked?.searchBy)) {
        contentType = "api";
    } else {
        contentType = "data";
    }
    return contentType;
}


type Node = {
    id: number;
    name: string;
    parentId: number;
    children?: Node[];
};


export function findParentAndSiblings(
    data: Node[] | undefined,
    clicked: Node | undefined
): { s: Node[],b: Node[] | undefined, c: Node[] | undefined} {
    if (!clicked) {
        return { s: data ?? [], b: undefined, c: undefined };
    }


    function flattenTree(nodes: Node[]): Node[] {
        const result: Node[] = [];

        function recurse(list: Node[]) {
            for (const node of list) {
                result.push(node);
                if (node.children) {
                    recurse(node.children);
                }
            }
        }

        recurse(nodes);
        return result;
    }

    if(data) {
        const flat =flattenTree(data);
        if(!clicked.children) clicked = flat.find(n => n.id === clicked?.parentId);
        const parent = flat.find(n => n.id === clicked?.parentId);
        const grandParent = flat.find(n => n.id === parent?.parentId);

        const b =  parent ? (parent?.children ?? clicked?.children) :clicked?.children;
        const s = grandParent ? (grandParent?.children?? data) : data
        const c = parent ? (clicked?.children ?? parent?.children ) : []
        return { s, b, c };
    }

    return { s: [], b: undefined, c: undefined };
}
