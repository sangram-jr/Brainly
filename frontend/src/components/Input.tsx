
import type { Ref } from "react";
//create reuseable input field
interface InputProps{
    placeholder:string,
    reference?:Ref<HTMLInputElement>
}

export function Input({placeholder,reference}:InputProps){
    return <div>
        <input 
            placeholder={placeholder} 
            ref={reference} 
            type={'text'}  
            className="px-4 py-2 m-2 rounded border border-gray-200"
        />
    </div>
}