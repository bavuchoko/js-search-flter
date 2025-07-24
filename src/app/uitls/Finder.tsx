import {FC, useEffect, useState} from "react";
import {findParentAndSiblings} from "./filterHelper";

type Props ={
    contents?:any[]
    height?:string;
}


const Finder:FC<Props> = ({contents, height}) => {
    const [clicked, setClicked] =useState<any | undefined>(undefined)
    const [parents, setParents] =useState<any[] | undefined>(undefined)
    const [brother, setBrother] =useState<any[] | undefined>(undefined)
    const [children, setChildren] =useState<any[] | undefined>(undefined)

    useEffect(() => {
        const { s, b, c } = findParentAndSiblings(contents, clicked);
        console.log('c',c)
        setParents(s);
        setBrother(b);
        setChildren(c)
    }, [clicked]);



    useEffect(() => {
        setParents(contents)
    }, [contents]);

    return (
        <div style={{display: 'flex'}}>
            <div style={{height:height, width:'calc((100% - 20px)/3)', background:'red'}}>
            {parents?.map((el: any)=>{
                return(
                    <div style={{}} onClick={()=>setClicked(el)}>{el.name}</div>
                )
            })}
            </div>
            <div style={{height:height, width:'calc((100% - 20px)/3)', marginLeft:'10px', background:'green'}}>
            {brother && brother?.map((el:any)=>{
                return(
                    <div style={{}} onClick={()=>setClicked(el)}>{el.name}</div>
                )
            })}
            </div>
            <div style={{height:height, width:'calc((100% - 20px)/3)', marginLeft:'10px', background:'blue'}}>
                {children && children?.map((el:any)=>{
                    return(
                        <div style={{}}  onClick={()=>setClicked(el)}>{el.name}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default Finder;