import {FC} from "react";
import {IconProps} from "../type/Types";

const Dash:FC<IconProps> =({style,onClick,type,checked})=>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 24 24" fill="none">
            <line
                x1="4"
                y1="12"
                x2="15"
                y2="12"
                stroke="#212121"
                strokeWidth="0.5"
             strokeLinecap="round"
        />
</svg>
)
}
export default Dash