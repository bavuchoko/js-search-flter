import React, {FC} from "react";
import {DrawerState} from "./OptionsByApi";


type Props ={
    drawerOpen :DrawerState;
    setDrawerOpen: (val:DrawerState) => void;
}

const SerchDrawer:FC<Props> =({drawerOpen, setDrawerOpen})=>{
    return (
        <div
            style={{
            position: 'absolute',
            top: '0',
            left: drawerOpen ==='opening' ? 0 : '-400px',
            width: '400px',
            height: '320px',
            backgroundColor: 'white',
            boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
            transition:
            drawerOpen === "closed"
            ? "none"
            : "left 0.1s ease-in-out",
            zIndex: 1000,
            padding: '16px',
            }}
        >
            <div style={{textAlign: 'right'}}>
            <button onClick={() => setDrawerOpen("closing")}>x</button>
            </div>

            {/* 여기에 drawerData 표시 */}
            <div>
                sef
            {/* 필요한 세부 내용 추가 */}
            </div>
        </div>
    )

}
export default SerchDrawer;