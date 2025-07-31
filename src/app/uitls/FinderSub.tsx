import FolderIcon from "../resources/svg/FolderIcon";
import FileIcon from "../resources/svg/FileIcon";
import {FC} from "react";


type FinderSubProps = {
    el: any;
    onClick: (el: any) => void;
    belong?: boolean;
    handle: (el:any)  => void;
    reverseColor?:boolean;
};
const FinderSub: FC<FinderSubProps>  =({el, handle,belong, reverseColor, onClick})=>{

    return(
        <div style={{display:'flex', padding:'8px 0 8px 8px',
            background : reverseColor
                ? belong ? 'white' : 'var(--jf-innerBorder)'
                : !belong ? 'white' : 'var(--jf-innerBorder)' }} className={'no-drag'}>
                <div style={{cursor:'pointer'}} className={`hover-circle`} onClick={()=>onClick(el)}>
                {el.children ?
                    <FolderIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} checked={belong} />
                    :
                    <FileIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}}/>
                }
                </div>
            <div className={`hover-bg-gray`} style={{width:'100%', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={() =>  handle?.(el)} >{el.name}</div>
        </div>
    )
}
export default FinderSub;