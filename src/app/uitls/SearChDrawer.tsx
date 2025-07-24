import React, {FC} from "react";
import {DrawerState} from "./OptionsByApi";
import Finder from "./Finder";


type Props ={
    data?: any[]
    drawerOpen :DrawerState;
    setDrawerOpen: (val:DrawerState) => void;
}

const SearChDrawer:FC<Props> =({data, drawerOpen, setDrawerOpen})=>{

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
            padding: '0 8px',
            }}
        >

            {/* 여기에 drawerData 표시 */}
            <Finder contents={data} height={'320px'}/>
            {/* 필요한 세부 내용 추가 */}
        </div>
    )

}
export default SearChDrawer;