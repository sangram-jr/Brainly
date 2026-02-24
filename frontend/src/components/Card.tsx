import { DeleteIcon } from "../icons/DeleteIcon";
import {YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { WatchIcon } from "../icons/WatchIcon";

interface CardProps{
    id:string,
    title:string,
    link:string,
    type:"youtube"|"twitter"
    onDelete:(id:string)=>void
}

export function Card({id,title,link,type,onDelete}:CardProps){
    return <div>
        <div className="bg-white border border-gray-200 rounded-md max-w-72 p-4 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="pr-3 text-gray-500">
                        {type==="youtube"?<YoutubeIcon/>:<TwitterIcon/>}
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={link} target="_blank"> {/*when user click to the shareIcon, then open the link into new tab  */}
                            <WatchIcon/>
                        </a>
                    </div>
                    <div className="text-gray-500 cursor-pointer" onClick={()=>onDelete(id)}>
                        <DeleteIcon/>
                    </div>
                    
                </div>
            </div>
            <div className="pt-4">
                {
                    type==="youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }

                {
                    type==="twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com","twitter.com")}></a> 
                    </blockquote>
                }
                
            </div>
        </div>
    </div>
}