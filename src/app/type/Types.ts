import React from "react";

/**
 * 필터 타입 정의
 * - user: 사용자
 * - company: 회사
 * - department: 부서
 * - code: 코드
 * - date: 날짜
 */
type FilterTypes = 'user'| 'company' | 'department' | 'code' | 'date' ;
type SearchTypes = {
    label: string;
    data: any[];
    listener:(v:any)=>void;
}


/**
 * label : 선택그룹 라벨 (ex: '등록자')
 *
 * key : 택그룹의 영문명: 보통 백엔드에서 필드명 (ex: 'createdBy')
 *
 * data : 해당 그룹에서 보여야 할 데이터들 (ex: 유저리스트)
 *
 * target : 선택창에서 보여줄 내용들 (ex: ['name', 'department.name', 'company.name'...])
 *  department.name 처럼 nested 하게 넣어준 키를 가지고 찾게된다.
 *  해당 span 요소마다 class를 달아주므로 별도의 스타일링 가능
 *
 *
 * */
export type Filter = {

    /** 선택그룹 라벨 (ex: '등록자') */
    label : string;
    /** 선택그룹의 영문명: 보통 백엔드에서 필드명 (ex: 'createdBy') */
    key: string;
    /** 해당 그룹에서 보여야 할 데이터들 (ex: 유저리스트) */
    data :any[];
    /** 선택창에서 보여줄 내용들 (ex: ['name', 'department.name', 'company.name'...])
     *  department.name 처럼 nested 하게 넣어준 키를 가지고 찾게된다.
     *  해당 span 요소마다 class를 달아주므로 별도의 스타일링 가능
     * */
    target?: string[];

    /** api 요청할 요소들
     * */
    searchBy?:SearchTypes[];

    /** 검색조건이 재귀적인 요소인지 여부 */
    recursive?:boolean;

    /** 아이콘또는 검색 타입을 위한 값 */
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