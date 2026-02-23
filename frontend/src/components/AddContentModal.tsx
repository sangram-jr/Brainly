import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType =
  (typeof ContentType)[keyof typeof ContentType];

interface ContentProps{
    open:boolean,
    onClose:()=>void
}

export function AddContentModal({open,onClose}:ContentProps){

    const titleRef=useRef<HTMLInputElement>(null);
    const linkRef=useRef<HTMLInputElement>(null);
    const [type,setType]=useState<ContentType>(ContentType.Youtube);

    async function addContent(){
        const title=titleRef.current?.value;
        const link=linkRef.current?.value;

        const token = localStorage.getItem("token");

        await axios.post(`${BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type
        },{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        onClose();
        
    }
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
                        <Input reference={titleRef} placeholder={'Title'}/>
                        <Input reference={linkRef} placeholder={'Link'}/>
                    </div>
                    <div>
                        <h1 className="font-semibold pl-3 text-gray-400 mt-2">Types :</h1>
                        <div className="flex p-3 gap-2">
                            <Button
                                text="Youtube"
                                variant={type===ContentType.Youtube?"primary":"secondary"} 
                                onClick={()=>{setType(ContentType.Youtube)}}
                            />
                            <Button
                                text="Twitter"
                                variant={type===ContentType.Twitter?"primary":"secondary"}
                                onClick={()=>{setType(ContentType.Twitter)}}
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-center">
                        <Button 
                            variant="primary" 
                            text="submit"
                            onClick={addContent}
                            fullWidth={true}
                        />
                    </div>
                </span>
            </div>
        </div>}
    </div>
}

