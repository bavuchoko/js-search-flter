import React from "react";


export type Filter = {
    label : string;
    key: string;
    data :any[];
    type?: string;
    recursive?:boolean;
    groupBy?:string[];
}

type ObjectType = {
    [key: string]: string | number;
};

export type ValueType = {
    [key: string]: string | number | number[] | string[] | undefined;
}
export type FilterProps ={
    filter? : Filter[]
    onValueChange ?: (value: ValueType | null) => void;
    onSearch ?: (value: ValueType | null) => void;
    onApiRequest? :(params: string[])=>void;
}


export type IconProps = {
    style?: React.CSSProperties;
    onClick?: ()=>void;
}