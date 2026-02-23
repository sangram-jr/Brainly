import type { ReactElement } from "react";

interface SidebarItemProps{
    icon:ReactElement,
    text:string
}
export function SidebarItem({icon,text}:SidebarItemProps){
    return <div className="flex py-2 pl-10 cursor-pointer">
        <div className="pr-2">
            {icon}
        </div>
        <div>
            {text}
        </div>
        
    </div>
}