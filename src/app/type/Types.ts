
export type Element ={
    id : number;
    name : string;
}

export type Filter = {
    label : string;
    data : Element[];
}

export type ValueType = {
    [key: string]: string | number | number[] | object | undefined;
}
export type FilterProps ={
    filter? : Filter[]
    onSearch ?: (value : ValueType) => void;
}