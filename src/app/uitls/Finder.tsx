import {FC, useEffect, useState} from "react";
import {flattenTree} from "./filterHelper";
import righter from "../resources/svg/Righter";
import FolderIcon from "../resources/svg/FolderIcon";
import FileIcon from "../resources/svg/FileIcon";

type Props ={
    contents?:any[]
    height?:string;
}


const Finder:FC<Props> = ({contents, height}) => {
    const [clicked, setClicked] =useState<any | undefined>(undefined)
    const [left, setLeft] =useState<any[] | undefined>(undefined)
    const [center, setCenter] =useState<any[] | undefined>(undefined)
    const [right, setRight] =useState<any[] | undefined>(undefined)

    const  flat = flattenTree(contents)



    const fistHandler =(el:any)=>{
        let parents = []
        let sibling = flat.filter(e => e.parentId === el.parentId)
        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                parents = flat.filter(e => e.parentId === parent.parentId)
                sibling = parent.children ?? []
            }
            else {
                parents = sibling
                sibling = el.children ?? []
            }
        }else{

        }
        setCenter(sibling)
        setLeft(parents)
        setRight([])
    }

    const secondHandler =(el:any)=>{
        let parents = [];
        let sibling = flat.filter(e => e.parentId === el.parentId)
        let children =el.children ?? [];

        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                parents = flat.filter(e => e.parentId === parent.parentId)
                sibling = parent.children ?? []
            }else {
                parents = sibling
                sibling = el.children ?? []
            }
        }else{

        }
        setCenter(sibling)
        setLeft(parents)
        setRight(children)
    }

    const thirdHandler =(el:any)=>{
        let parents = left ?? [];
        let sibling = center ?? []
        let children = right ?? [];

        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                if(el.children){
                    parents = flat.filter(e => e.parentId === parent.parentId)
                    sibling = parent.children ?? []
                    children = el.children
                    setCenter(sibling)
                    setLeft(parents)
                    setRight(children)
                }else{

                }
            }
        }



    }

    useEffect(() => {
        setLeft(contents)
    }, [contents]);




    return (
        <div style={{display: 'flex', boxSizing: 'border-box', }}>
            <div style={{ height:height, width:'calc((100%)/3)'  ,background: 'var(--innerBorder)', paddingLeft:'8px' }}>
            {left?.map((el: any)=>{
                return(
                    <div style={{display:'flex', padding:'8px 0',}} className={'no-drag'}>
                        {el.children ?
                            <FolderIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} checked={true}/>
                            :
                            <FileIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} />
                        }
                        <div style={{width:'100%', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={()=>fistHandler(el)}>{el.name}</div>
                    </div>
                )
            })}
            </div>
            <div style={{ height:height, width:'calc((100%)/3)', background:'white', paddingLeft:'8px'}}>
            {center && center?.map((el:any)=>{
                return(
                    <div style={{display:'flex', padding:'8px 0',}} className={'no-drag'}>
                        {el.children ?
                            <FolderIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} checked={true}/>
                            :
                            <FileIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} />
                        }
                        <div style={{width:'100%', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={()=>secondHandler(el)}>{el.name}</div>
                    </div>
                )
            })}
            </div>
            <div style={{ height:height, width:'calc((100%)/3)', paddingLeft:'8px', background: (right?.length?? 0) > 0 ? 'var(--innerBorder' : 'white'}}>
            {right && right?.map((el:any)=>{
                return(
                    <div style={{display:'flex', padding:'8px 0',}} className={'no-drag'}>
                        {el.children ?
                            <FolderIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} checked={true}/>
                            :
                            <FileIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} />
                        }
                        <div style={{width:'100%', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={()=>thirdHandler(el)}>{el.name}</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
export default Finder;