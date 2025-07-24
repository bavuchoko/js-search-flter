import {FC, useEffect, useState} from "react";
import {flattenTree} from "./filterHelper";

type Props ={
    contents?:any[]
    height?:string;
}


const Finder:FC<Props> = ({contents, height}) => {
    const [clicked, setClicked] =useState<any | undefined>(undefined)
    const [parents, setParents] =useState<any[] | undefined>(undefined)
    const [brother, setBrother] =useState<any[] | undefined>(undefined)
    const [children, setChildren] =useState<any[] | undefined>(undefined)

    const  flat = flattenTree(contents)



    const fistHandler =(el:any)=>{
        console.log(flat)
    }

    const secondHandler =(el:any)=>{

    }

    const thirdHandler =(el:any)=>{

    }

    useEffect(() => {
        setParents(contents)
    }, [contents]);




    return (
        <div style={{display: 'flex'}}>
            <div style={{height:height, width:'calc((100% - 20px)/3)', background:'red'}}>
            {parents?.map((el: any)=>{
                return(
                    <div style={{display:'flex'}}>
                        {el.children && <span>++</span>}
                    <div style={{cursor:'pointer'}} onClick={()=>fistHandler(el)}>{el.name}</div>
                    </div>
                )
            })}
            </div>
            <div style={{height:height, width:'calc((100% - 10px)/3)', marginLeft:'5px', background:'green'}}>
            {brother && brother?.map((el:any)=>{
                return(
                    <div style={{display:'flex'}}>
                        {el.children && <span>++</span>}
                    <div style={{cursor:'pointer'}} onClick={()=>secondHandler(el)}>{el.name}</div>
                    </div>
                )
            })}
            </div>
            <div style={{height:height, width:'calc((100% - 10px)/3)', marginLeft:'5px', background:'blue'}}>
                {children && children?.map((el:any)=>{
                    return(
                        <div style={{display:'flex'}}>
                            {el.children && <span>++</span>}
                            <div style={{cursor:'pointer'}}  onClick={()=>thirdHandler(el)}>{el.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Finder;