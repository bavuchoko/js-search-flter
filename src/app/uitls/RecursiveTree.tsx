import {FC, useState} from "react";

type Props = {
    keys: string;
    data: any[];
    handle?: (key: string, val: number) => void;
}

const RecursiveTree:FC<Props> =({keys, data, handle}) =>{
    const [currentNodes, setCurrentNodes] = useState<any[]>(data);
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
            }}
        >
                {currentNodes.map(node => (
                    <div
                        key={node.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                            cursor:'pointer',
                        }}
                    >
                        <span id={keys}
                            onClick={() => handle?.(keys, node.id)}
                        >
                          {node.name}
                            {node.children && node.children.length > 0 && (
                                <button
                                    style={{marginLeft:'10px'}}
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrentNodes(node.children!);
                                    }}
                                >
                                    ▶
                                </button>
                            )}
                        </span>


                    </div>
                ))}
        </div>
    )
}
export default RecursiveTree;