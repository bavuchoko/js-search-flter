import {FC} from "react";

type customProps ={
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}


const Righter: FC<customProps> =({onClick})=>{
    return(
        <div onClick={onClick}
                style={{
                    padding:'0',
                    borderRadius:'0 5px 5px 0',
                    background:'var(--darkGray)',
                    height:'18px',
                    marginTop:'1px',
                    width:'20px',
                    cursor:'pointer'
                }}
                className={`active-scale-90 pagination-righter-button`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="white"
                 style={{
                     width:'20px',
                     height:'18px'
                 }} viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <g transform="rotate(180, 12, 12)">
                    <path
                        d="M11.3,12l3.5-3.5c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0l-4.2,4.2l0,0c-0.4,0.4-0.4,1,0,1.4l4.2,4.2c0.2,0.2,0.4,0.3,0.7,0.3l0,0c0.3,0,0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L11.3,12z"/>
                </g>
            </svg>
        </div>
    )
}
export default Righter;