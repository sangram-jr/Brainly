import { useState } from "react"
import { AddContentModal } from "../components/AddContentModal"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"



function Dashboard() {
  const [openModel,setOpenModal]=useState(false);
  const {contents,refresh}=useContent();

  //delete card api call
  async function handleDelete(id:string){
    await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    });
    refresh(); 
  }

  

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-200">
        <AddContentModal open={openModel} onClose={()=>{setOpenModal(false)}}/>
        <div className="flex justify-end gap-4">
            <Button 
              variant="primary" 
              text="Add Content" 
              startIcon={<PlusIcon />} 
              onClick={()=>{setOpenModal(true)}}
            />
            <Button 
              variant="secondary" 
              text="Share Brain" 
              startIcon={<ShareIcon />}
              onClick={async()=>{
                const response=await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                  share:true
                },{
                  headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                  }
                });
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}
            /> 
        </div>
        
        <div className="flex gap-4 flex-wrap mt-4">
          {
            contents.map(({title,link,type,_id})=>
            <Card 
              key={_id}
              id={_id}
              title={title} 
              link={link} 
              type={type}
              onDelete={handleDelete}
            />)
          }
          
        </div>
      </div>
    </div>
    
      
  )
}

export default Dashboard;
