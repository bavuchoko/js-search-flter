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




export function flattenTree(nodes: any[] | undefined): any[] {
    const result: any[] = [];

    function recurse(list: any[]|undefined) {
        if(list) {
            for (const node of list) {
                result.push(node);
                if (node.children) {
                    recurse(node.children);
                }
            }
        }
    }

    recurse(nodes);
    return result;
}

export function findAllParents(flat: any[] | undefined, nodeId: number | string): number[] {
    const parents: number[] = [];
    console.log(nodeId);
    let current = flat?.find(n => n.id === nodeId);
    console.log(current)
    while (current && current.parentId) {
        const parent = flat?.find(n => n.id === current.parentId);
        if (parent) {
            parents.push(parent.id);
            current = parent;
        } else {
            break;
        }
    }

    return parents;
}