import {FC, useEffect, useMemo, useState} from "react";
import {findAllParents, flattenTree} from "./filterHelper";
import righter from "../resources/svg/Righter";
import FolderIcon from "../resources/svg/FolderIcon";
import FileIcon from "../resources/svg/FileIcon";
import FinderSub from "./FinderSub";

type Props ={
    contents?:any[]
    height?:string;
}


const Finder:FC<Props> = ({contents, height}) => {
    const [clickLine, setClickLine] =useState<number[] | undefined>(undefined)
    const [left, setLeft] =useState<any[] | undefined>(undefined)
    const [center, setCenter] =useState<any[] | undefined>(undefined)
    const [right, setRight] =useState<any[] | undefined>(undefined)

    const flat = useMemo(() => flattenTree(contents), [contents]);



    useEffect(() => {
        setCenter([])
        setRight([])
    }, [contents]);

    const fistHandler =(el:any)=>{
        if(!clickLine?.includes(el.id)) setRight([])
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
        let parents = []
        let sibling = flat.filter(e => e.parentId === el.parentId)
        if(el.parentId){
            const parent = flat.find(e => e.id === el.parentId)
            if(parent) {
                parents = flat.filter(e => e.parentId === parent.parentId)
                sibling = parent.children ?? []
                if(el.children){
                    setRight(el.children ?? [])
                }
            }
            else {
                parents = sibling
                sibling = el.children ?? []
            }
            setCenter(sibling)
            setLeft(parents)

        }else{

        }

    }

    const secondHandler =(el:any)=>{
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
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
        const myParents =  findAllParents(flat, el.id);
        setClickLine([...myParents, el.id])
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
        <div style={{display: 'flex', boxSizing: 'border-box', overflow:"hidden", paddingTop:'25px' }}>
            <div className={'js-search-narrow-scroll'} style={{ height:height, width:'calc((100%)/3)', background: 'white',  overflowY:'auto', borderRight:'1px solid var(--background)'}}>
            {left?.map((el: any)=>{
                return(
                    <FinderSub el={el} belong={clickLine?.includes(el.id) } handler={fistHandler} />
                )
            })}
            </div>
            <div style={{ height:height, width:'calc((100%)/3)', background: 'white', borderRight:'1px solid var(--background)' }}>
            {center && center?.map((el:any)=>{
                return(
                    <FinderSub el={el} handler={secondHandler} belong={clickLine?.includes(el.id)}  />
                )
            })}
            </div>
            <div style={{ height:height, width:'calc((100%)/3)',background: 'white', }}>
            {right && right?.map((el:any)=>{
                return(
                    <FinderSub el={el} handler={thirdHandler} />
                )
            })}
            </div>
        </div>
    )
}
export default Finder;