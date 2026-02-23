import { useState } from "react"
import { AddContentModal } from "../components/AddContentModal"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"



function Dashboard() {
  const [openModel,setOpenModal]=useState(false);
  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-200">
        <AddContentModal open={openModel} onClose={()=>{setOpenModal(false)}}/>
        <div className="flex justify-end gap-4">
            <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} onClick={()=>{setOpenModal(true)}}/>
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />}/> 
        </div>
        
        <div className="flex gap-4">
          <Card title="first youtube video" link="https://www.youtube.com/watch?v=umejNI-fafg" type="youtube"/>
          <Card title="first twitter post" link="https://x.com/quantapar/status/2025307568617422929" type="twitter"/>
        </div>
      </div>
    </div>
    
      
  )
}

export default Dashboard;
