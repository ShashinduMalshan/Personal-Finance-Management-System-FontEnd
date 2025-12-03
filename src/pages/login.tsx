import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"


export default function LoginPage() {
    const natigate = useNavigate()

    const { setUser } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()

        console.log("Login clicked", { username, password })

        if (!username || !password) {
            alert("Please enter username and password")
            return
        }

        try {
            console.log("Attempting login...")
            const res = await login(username, password)
            console.log(res.data.accessToken)
            await localStorage.setItem("accessToken", res.data.accessToken)
            alert("Login successful")

            // const details = await getMyDetails()
            // setUser(details.data)
            // natigate("/home")

        } catch (error) {
            console.log("Login failed", error)
        }
    }

    
    // s
    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

