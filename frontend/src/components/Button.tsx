import type { ReactElement } from "react";

interface ButtonProps{
    variant:"primary" | "secondary",
    text:string,
    startIcon?:ReactElement,
    onClick?:()=>void,
    fullWidth?:boolean,
    loading?:boolean
}

const VariantClass={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}
//default style that is applicable for both the button
const defaultStyle="px-4 py-2 rounded-md font-normal flex items-center cursor-pointer"


export function Button({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps){
    return (
        <button onClick={onClick} className={VariantClass[variant] + " " + defaultStyle + `${fullWidth?" w-full flex justify-center items-center":""} ${loading?"opacity-45":""}`} disabled={loading}>
            <div className="pr-2">
                {startIcon}
            </div>
            {text}   
        </button>
    )
}