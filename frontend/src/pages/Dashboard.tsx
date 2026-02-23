import { useEffect, useState } from "react"
import { AddContentModal } from "../components/AddContentModal"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"



function Dashboard() {
  const [openModel,setOpenModal]=useState(false);
  const {contents,refresh}=useContent();

  useEffect(()=>{
    if(!openModel){
      refresh();
    }
    
  },[openModel,refresh])

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-200">
        <AddContentModal open={openModel} onClose={()=>{setOpenModal(false)}}/>
        <div className="flex justify-end gap-4">
            <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} onClick={()=>{setOpenModal(true)}}/>
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}/> 
        </div>
        
        <div className="flex gap-4 flex-wrap mt-4">
          {
            contents.map(({title,link,type})=>
            <Card 
              title={title} 
              link={link} 
              type={type}
            />)
          }
          
        </div>
      </div>
    </div>
    
      
  )
}

export default Dashboard;
