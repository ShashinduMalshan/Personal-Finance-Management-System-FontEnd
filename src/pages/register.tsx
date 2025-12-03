import { useState, type FormEvent } from "react"
import { getMyDetails, registerUser } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function registerPage() {
    const natigate = useNavigate()
    
    const { setUser } = useAuth()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()

        console.log("Register clicked", { username, email, password })

        if (!username || !email || !password){
            alert("all feilds are required")
            return
        }
        
        try {

            const obj = {username, email, password}
            console.log("Attempting register...")
            const res = await registerUser(obj)
            console.log(res);

            alert("Register successful")
            natigate("/login")
        } catch (error) {
            console.log("Register failed", error)
            alert("Register failed")

        }
    }



    return ( <div>
        <h1>Register Page</h1>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
    </div> )

}
    