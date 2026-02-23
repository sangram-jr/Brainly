import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from 'axios'
import { BACKEND_URL } from "../config";

export function SignUp(){
    const usernameRef=useRef<HTMLInputElement>(null);
    const PasswordRef=useRef<HTMLInputElement>(null);
    async function fetchData(){
        const username=usernameRef.current?.value;
        const password=PasswordRef.current?.value;
        
        await axios.post(BACKEND_URL + "/api/v1/signup",{
            username,
            password
        });
        alert("you are signed up")
        
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 border border-gray-200 p-8">
            <Input reference={usernameRef} placeholder="Username"/>
            <Input reference={PasswordRef} placeholder="Password"/>
            <div className="flex justify-center items-center pt-4">
                <Button 
                    variant="primary" 
                    text="SignUp" 
                    fullWidth={true} 
                    loading={false}
                    onClick={fetchData}
                />
            </div>

        </div>

    </div>
}