import {FC} from "react";
import {IconProps} from "../../type/Types";

const FileIcon:FC<IconProps> =({style, onClick, checked})=>{
    return(
        <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16" style={style}><path fill="#fff" d="M2.5 14.5L2.5 0.5 9.867 0.5 13.5 4.204 13.5 14.5z"/><path fill="#788b9c" d="M9.657,1L13,4.409V14H3V1H9.657 M10.077,0H2v15h12V4L10.077,0L10.077,0z"/><g><path fill="#fff" d="M9.5 4.5L9.5 0.5 9.831 0.5 13.5 4.206 13.5 4.5z"/><path fill="#788b9c" d="M10,1.381L12.593,4H10V1.381 M10.04,0H9v5h5V4L10.04,0L10.04,0z"/></g></svg>
    )
}

export default FileIcon