import React from "react";

export type Data ={
    id : number;
    name : string;

}

export type Filter = {
    label : string;
    key: string;
    data : Data[];
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
}


export type IconProps = {
    style?: React.CSSProperties;
    onClick?: ()=>void;
}