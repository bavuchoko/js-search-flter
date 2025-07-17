import {FC} from "react";
import CloseIcon from "./CloseIcon";

type ModalProps ={
    close?:()=>void;

}

const Modal:FC<ModalProps> =({close=undefined})=>{
    return(
        <>
            <div
                style={{
                    position:'fixed',
                    zIndex:'100',
                    width:'100%',
                    height:'100%',
                    backgroundColor:'var(--modalBackground)',
                    top:'0',
                    left:'0'
                }}
                onClick={close}
            ></div>

            <div
                style={{
                    position:'fixed',
                    zIndex:'101',
                    backgroundColor:'white',
                    width:'480px',
                    height:'580px',
                    borderRadius:'8px',
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%, -50%)',
            }}>
                <div style={{marginTop:'12px'}}>
                    <div style={{padding:'9px 16px', justifyContent:'space-between', display:'flex', fontSize:'16px', fontWeight:'bold'}}>
                        <div>필터</div>
                        <CloseIcon style={{width:'20px', height:"20px"}} onClick={close}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Modal;