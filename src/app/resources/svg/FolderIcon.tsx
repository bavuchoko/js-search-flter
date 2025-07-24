import {FC} from "react";
import {IconProps} from "../../type/Types";

const FolderIcon:FC<IconProps> = ({style, onClick, checked}) =>{

    return (
        <>
        {checked ?
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 2 3 L 1.9980469 19.083984 L 4.9941406 9 L 22 9 L 22 5 L 10.445312 5 L 8.4101562 3 L 2 3 z M 5.6171875 10.009766 L 2.8105469 20 L 21.208984 20 L 23.998047 10.009766 L 5.6171875 10.009766 z"/>
            </svg>

            :
            <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M10.42,5L8.407,3H2v17h20V5H10.42z"/>
            </svg>
}
</>
)
}
export default FolderIcon