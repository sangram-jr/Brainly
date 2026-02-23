import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary",
    text:string,
    startIcon:ReactElement,
    onClick?:()=>void
}

const VariantClass={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}
//default style that is applicable for both the button
const defaultStyle="px-4 py-2 rounded-md font-normal cursor-pointer flex items-center"


export function Button({variant,text,startIcon,onClick}:ButtonProps){
    return (
        <button onClick={onClick} className={VariantClass[variant] + " " + defaultStyle}>
            <div className="pr-2">
                {startIcon}
            </div>
            {text}   
        </button>
    )
}