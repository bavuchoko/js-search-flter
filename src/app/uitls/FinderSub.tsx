import FolderIcon from "../resources/svg/FolderIcon";
import FileIcon from "../resources/svg/FileIcon";
import {FC} from "react";


type FinderSubProps = {
    el: any;
    handler: (el: any) => void;
    belong?: boolean;
    reverseColor?:boolean;
};
const FinderSub: FC<FinderSubProps>  =({el, handler,belong, reverseColor})=>{
    return(
        <div style={{display:'flex', padding:'8px 0 8px 8px',
            background : reverseColor
                ? belong ? 'white' : 'var(--innerBorder)'
                : !belong ? 'white' : 'var(--innerBorder)' }} className={'no-drag'}>
            {el.children ?
                <FolderIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} checked={true}/>
                :
                <FileIcon style={{width:'15px', height:'15px', display:'inline-block', marginRight:'5px'}} />
            }
            <div style={{width:'100%', cursor:'pointer', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}} onClick={()=>handler(el)}>{el.name}</div>
        </div>
    )
}
export default FinderSub;