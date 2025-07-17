import React, {FC} from "react";
import {IconProps} from "../type/Types";


const CloseIcon: FC<IconProps> =({style, onClick })=>{

    return(
        <div style={style} onClick={onClick}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line x1="5" y1="5" x2="19" y2="19" stroke="black" stroke-width="1"/>
                <line x1="19" y1="5" x2="5" y2="19" stroke="black" stroke-width="1"/>
            </svg>
        </div>
    )
}
export default CloseIcon;