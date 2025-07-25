import React, {FC} from "react";

import Finder from "./Finder";
import {DrawerState} from "../type/Types";
import ChevronLeft from "../resources/svg/ChevronLeft";


type Props ={
    data?: any[]
    drawerOpen :DrawerState | undefined;
    closeDrawerHandler?: () => void;
}



const SearChDrawer:FC<Props> =({data, drawerOpen, closeDrawerHandler})=>{



    return (
        <div
            style={{
            position: 'absolute',
            top: '37px',
            left: drawerOpen ==='opening' ? 0 : '-400px',
            width: '400px',
            height: '322px',
            backgroundColor: 'white',
            boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
            transition:
            drawerOpen === "closed"
            ? "none"
            : "left 0.1s ease-in-out",
            zIndex: 1000,
            }}
        >
            <div style={{padding:'0 12px', display:'flex', alignItems:'center', width:'100%', height:'25px', borderBottom:'1px solid var(--innerBorder)', position:'absolute', top:0, left:0}}>
                <div style={{cursor:'pointer', marginRight:'5px', borderRadius:'50%', color:'white', background:'red', lineHeight:'12px', textAlign:'center', height:'14px', width:'14px', }} onClick={closeDrawerHandler}>x</div>
                <ChevronLeft style={{cursor:'pointer', width:'14px', height:'14px', backgroundColor:'var(--themeBlue)', color:'white', borderRadius:'50%'}} />
            </div>
            {/* 여기에 drawerData 표시 */}
            <Finder contents={data} height={'322px'}/>
            {/* 필요한 세부 내용 추가 */}
        </div>
    )

}
export default SearChDrawer;