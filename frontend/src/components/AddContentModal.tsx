import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export function AddContentModal({open,onClose}){
    return <div>
        {open && <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                        
                    </div>
                    <div>
                        <Input placeholder={'Title'}/>
                        <Input placeholder={'Link'}/>
                    </div>
                    <div className="flex justify-center">
                        <Button variant="primary" text="submit"/>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

//create reuseable input field
interface InputProps{
    onChange:()=> void,
    placeholder:string
}

function Input({onChange,placeholder}:InputProps){
    return <div>
        <input placeholder={placeholder} type={'text'} onChange={onChange} className="px-4 py-2 m-2 rounded border border-gray-200"/>
    </div>
}