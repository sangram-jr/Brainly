//import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import { SharePage } from "./pages/SharePage"




function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/share/:hash" element={<SharePage/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
