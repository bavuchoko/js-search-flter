import React from "react";

export type Element ={
    id : number;
    name : string;
}

export type Filter = {
    label : string;
    data : Element[];
}

type ObjectType = {
    [key: string]: string | number;
};

export type ValueType = {
    [key: string]: string | number | number[] | string[] | undefined;
}
export type FilterProps ={
    filter? : Filter[]
    onSearch ?: (value : ValueType) => void;
}


export type IconProps = {
    style?: React.CSSProperties;
    onClick?: ()=>void;
}