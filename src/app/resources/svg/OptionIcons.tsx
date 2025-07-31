import {IconProps} from "../../type/Types";
import {FC} from "react";



const OptionIcons:FC<IconProps> =({ style, onClick, type, checked} )=>{

    return(
        <span style={{marginTop:'5px'}}>
            {(!type || type==='code')&&
            <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop:'3px',...style}} viewBox="0 0 25 25" fill="none">
                <path
                    d="M7.5 12.5L7.07574 12.0757L6.65147 12.5L7.07574 12.9243L7.5 12.5ZM17.5 12.5L17.9243 12.9243L18.3485 12.5L17.9243 12.0757L17.5 12.5ZM11.4243 15.5757L7.92426 12.0757L7.07574 12.9243L10.5757 16.4243L11.4243 15.5757ZM7.92426 12.9243L11.4243 9.42426L10.5757 8.57574L7.07574 12.0757L7.92426 12.9243ZM13.5757 9.42426L17.0757 12.9243L17.9243 12.0757L14.4243 8.57574L13.5757 9.42426ZM17.0757 12.0757L13.5757 15.5757L14.4243 16.4243L17.9243 12.9243L17.0757 12.0757Z"
                    fill="#121923"/>
            </svg>
            }

            {!checked && type === 'user' && (
                <svg xmlns="http://www.w3.org/2000/svg" style={style} fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
            )}

            {!checked && type === 'company' && (
                <svg xmlns="http://www.w3.org/2000/svg" style={style} fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
                </svg>
            )}
            {!checked && type === 'department' && (
                <svg  style={style}  viewBox="0 0 22 22"  xmlns="http://www.w3.org/2000/svg">
                    <path
                        strokeWidth="0.5"
                        d="M9.99992 2C8.34271 2 6.99927 3.34344 6.99927 5.00066C6.99927 6.48754 8.08073 7.72183 9.49999 7.95985V9.5H6.5C5.67157 9.5 5 10.1716 5 11V12.0416C3.5811 12.2799 2.5 13.514 2.5 15.0007C2.5 16.6579 3.84344 18.0013 5.50066 18.0013C7.15787 18.0013 8.50131 16.6579 8.50131 15.0007C8.50131 13.5136 7.41954 12.2791 6 12.0414V11C6 10.7239 6.22386 10.5 6.5 10.5H13.5C13.7761 10.5 14 10.7239 14 11V12.0416C12.5811 12.2799 11.5 13.514 11.5 15.0007C11.5 16.6579 12.8434 18.0013 14.5007 18.0013C16.1579 18.0013 17.5013 16.6579 17.5013 15.0007C17.5013 13.5136 16.4195 12.2791 15 12.0414V11C15 10.1716 14.3284 9.5 13.5 9.5H10.5V7.95983C11.9192 7.72176 13.0006 6.48749 13.0006 5.00066C13.0006 3.34344 11.6571 2 9.99992 2ZM7.99927 5.00066C7.99927 3.89572 8.89499 3 9.99992 3C11.1049 3 12.0006 3.89572 12.0006 5.00066C12.0006 6.10559 11.1049 7.00131 9.99992 7.00131C8.89499 7.00131 7.99927 6.10559 7.99927 5.00066ZM3.5 15.0007C3.5 13.8957 4.39572 13 5.50066 13C6.60559 13 7.50131 13.8957 7.50131 15.0007C7.50131 16.1056 6.60559 17.0013 5.50066 17.0013C4.39572 17.0013 3.5 16.1056 3.5 15.0007ZM14.5007 13C15.6056 13 16.5013 13.8957 16.5013 15.0007C16.5013 16.1056 15.6056 17.0013 14.5007 17.0013C13.3957 17.0013 12.5 16.1056 12.5 15.0007C12.5 13.8957 13.3957 13 14.5007 13Z"
                        />
                </svg>
            )}
            {!checked && type === 'date' && (
                <svg style={style}  xmlns="http://www.w3.org/2000/svg" className="wd-icon-calendar wd-icon"
                     focusable="false" role="presentation" viewBox="0 0 24 24">
                    <g fillRule="evenodd" className="wd-icon-container">
                        <path fill="var(--jf-deepGray)" d="M4 5h16v4H4z" className="wd-icon-background"/>
                        <path
                            fill="var(--jf-deepGray)"
                            d="M7.495 2c.279 0 .505.216.505.495V4h8V2.495c0-.273.214-.495.505-.495h.99c.279 0 .505.216.505.495V4h2.007c.548 0 .993.451.993.99v15.075c0 .47-.368.86-.854.925a.995.995 0 0 1-.14.01H3.994a1 1 0 0 1-.176-.016c-.465-.08-.817-.46-.817-.919V4.991C3 4.444 3.445 4 3.993 4H6V2.495C6 2.222 6.214 2 6.505 2zM19 10H5v9h14v-9zm-8.49 2c.27 0 .49.215.49.49v3.02c0 .27-.215.49-.49.49H7.49a.488.488 0 0 1-.49-.49v-3.02c0-.27.215-.49.49-.49h3.02zM19 6H5v2h14V6z"
                            className="wd-icon-fill"/>
                    </g>
                </svg>
            )}
            {checked &&
                <svg xmlns="http://www.w3.org/2000/svg"
                    // style={{border:'1px solid black', borderRadius:'50%' ,...style}}
                     style={style}
                     viewBox="0 0 20 20">
                    <path
                        fill="black"
                        // fill="var(--checked)"
                        fillRule="evenodd"
                        d="M15.78 5.97a.75.75 0 0 1 0 1.06l-6.5 6.5a.75.75 0 0 1-1.06 0l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 5.97-5.97a.75.75 0 0 1 1.06 0Z"/>
                </svg>
            }
        </span>
    )
}
export default OptionIcons