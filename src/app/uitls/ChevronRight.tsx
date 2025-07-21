import {FC} from "react";
import {IconProps} from "../type/Types";

const ChevronRight:FC<IconProps> =({style, onClick,type, checked})=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 20 20" fill="none">
            <path
                d="M14.53 12.28L10.06 7.81L5.59 12.28"
                stroke="#212121"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                transform="rotate(90 10 10)"
            />
        </svg>
    )
}
export default ChevronRight