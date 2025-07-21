import {IconProps} from "../type/Types";
import {FC} from "react";



const OptionIcons:FC<IconProps> =({ style, onClick, type, checked} )=>{

    return(
        <>
            {(!type || type==='code')&&
            <svg xmlns="http://www.w3.org/2000/svg" style={style} viewBox="0 0 25 25" fill="none">
                <path
                    d="M7.5 12.5L7.07574 12.0757L6.65147 12.5L7.07574 12.9243L7.5 12.5ZM17.5 12.5L17.9243 12.9243L18.3485 12.5L17.9243 12.0757L17.5 12.5ZM11.4243 15.5757L7.92426 12.0757L7.07574 12.9243L10.5757 16.4243L11.4243 15.5757ZM7.92426 12.9243L11.4243 9.42426L10.5757 8.57574L7.07574 12.0757L7.92426 12.9243ZM13.5757 9.42426L17.0757 12.9243L17.9243 12.0757L14.4243 8.57574L13.5757 9.42426ZM17.0757 12.0757L13.5757 15.5757L14.4243 16.4243L17.9243 12.9243L17.0757 12.0757Z"
                    fill="#121923"/>
            </svg>
            }

            { type === 'user' && (
                checked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" style={{color:'var(--deepBlue)',...style}} fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" style={style} fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="0.5" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                )
            )}

            { type === 'company' && (
                checked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" style={{color:'var(--deepBlue)',...style}} fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" style={style} fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
                    </svg>
                )
            )}

        </>
    )
}
export default OptionIcons