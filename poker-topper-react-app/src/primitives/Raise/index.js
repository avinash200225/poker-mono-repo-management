import React, { forwardRef } from 'react'

export default forwardRef (function index({id, ...props}, ref) {
    return (<svg xmlns="http://www.w3.org/2000/svg"
        id={id}
        ref={el => ref.current[id] = el}
        width="34" 
        height="34" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M10 12h2a2 2 0 1 0 0 -4h-2v8m4 0l-3 -4"></path>
    </svg>)
})
