import {FC, useState} from "react";
import OptionIcons from "./OptionIcons";
import {FilterTypes} from "../type/Types";

type Props = {
    keys: string;
    data: any[];
    handle?: (key: string, val: number) => void;
    type?: FilterTypes;
}

const RecursiveTree:FC<Props> =({keys, data, handle, type}) =>{
    const [currentNodes, setCurrentNodes] = useState<any[]>(data);
    console.log(type)
    return (
        <div
            style={{
               width:'100%'
            }}
        >
                {currentNodes.map((node, index) => (
                    <div
                        key={node.id}
                        style={{
                            padding:'0 16px',
                            marginBottom:'6px',
                            height:'25px',
                            display: 'flex',
                            alignItems: 'center',
                            boxSizing: 'border-box',
                            background:(index % 2)==0? '':'var(--background)',
                            cursor:'pointer',
                        }}
                    >
                        <OptionIcons style={{width:'18px', height:'18px'}} type={type} checked={false}/>
                        <span id={keys}
                            onClick={() => handle?.(keys, node.id)}
                        >
                          {node.name}
                            {node.children && node.children.length > 0 && (
                                <></>
                            )}
                        </span>


                    </div>
                ))}
        </div>
    )
}
export default RecursiveTree;