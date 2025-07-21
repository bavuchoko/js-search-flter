import React from "react";

type FilterTypes = 'user'| 'company' | 'department' | 'code' ;

export type Filter = {
    label : string;
    key: string;
    data :any[];
    recursive?:boolean;
    groupBy?:string[];
    type?: FilterTypes;
}

export type ValueType = {
    [key: string]: string | number | number[] | string[] | undefined;
}
export type FilterProps ={
    filter? : Filter[]
    onValueChange?: (value: ValueType | null) => void;
    onSearch?: (value: ValueType | null) => void;
    onApiRequest? :(params: string[])=>void;
}


export type IconProps = {
    style?: React.CSSProperties;
    onClick?: ()=>void;
    type?: FilterTypes;
    checked?: boolean ;
}


export const COLORS = ['red', 'blue', 'green', 'orange', 'purple'];