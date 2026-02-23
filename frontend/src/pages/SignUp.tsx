import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp(){
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl min-w-48 border border-gray-200 p-8">
            <Input placeholder="Username"/>
            <Input placeholder="Password"/>
            <div className="flex justify-center items-center pt-4">
                <Button variant="primary" text="SignUp" fullWidth={true} loading={true}/>
            </div>

        </div>

    </div>
}