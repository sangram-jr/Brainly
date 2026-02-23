import { LogoIcon } from "../icons/LogoIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className="h-screen w-72 border-r border-gray-200  bg-white fixed left-0 top-0 pl-6">
        <div className="flex items-center text-2xl font-bold pt-4">
            <div className="pr-2 text-purple-600">
                <LogoIcon/>
            </div>
            Brainly
        </div>
        <div className="pt-4">
            <SidebarItem icon={<TwitterIcon/>} text="Twitter"/>
            <SidebarItem icon={<YoutubeIcon/>} text="YouTube"/>
        </div>
        
    </div>
}