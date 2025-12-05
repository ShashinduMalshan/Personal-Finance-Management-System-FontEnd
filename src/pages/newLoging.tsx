import React, { useState, useEffect, type FormEvent } from 'react';
import { User, Lock, Check, Mail, Facebook, Linkedin, Chrome } from 'lucide-react';
import InputField from '../Components/InputField';
import WaveGraphic from '../Components/WaveGraphic';
import { generateWelcomeMessage } from '../services/geminiService';
import bgImage from "../assets/traxer-ayiCvp7Ta30-unsplash.jpg";
import { getMyDetails, login, registerUser } from '../services/auth';
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/authContext';






const newLoging: React.FC = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()


    // isSignUpMode = true means the overlay is on the LEFT, showing the Register form on the RIGHT.
    // Wait, let's align with the user request:
    // "when i click sign in green side go to the right and turn field register"
    // Start state: Green Overlay on Left ("Welcome Back!"). Right side has "Create Account".
    // Click "Sign In": Overlay slides Right. Left side reveals "Sign In".

    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conformPassword, setConformPassword] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('To keep connected with us please login with your personal info');
    const { user } = useAuth();


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

            if (!res.data.data.accessToken) {
                alert("Login failed!")
                return
            }
            await localStorage.setItem("accessToken", res.data.data.accessToken)
            await localStorage.setItem("refreshToken", res.data.data.refreshToken)

            const details = await getMyDetails()
            setUser(details.data)
            console.log("user " + user.username.charAt(0));


            navigate("/dashboard")

        } catch (error) {
            console.log("Login failed", error)
        }
    }



    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()

        console.log("Register clicked", { username, email, password })

        if (!username || !email || !password) {
            alert("all feilds are required")
            return
        }

        if (password !== conformPassword) {
            alert("passwords do not match")
            return
        }

        try {

            const obj = { username, email, password }
            console.log("Attempting register...")
            const res = await registerUser(obj)
            console.log(res);

            alert("Register successful")
            navigate("/login")
        } catch (error) {
            console.log("Register failed", error)
            alert("Register failed")

        }
    }




    //   // Debounce for AI message
    useEffect(() => {
        if (!username && !email) return;

        const timeoutId = setTimeout(async () => {
            const user = username || email.split('@')[0] || 'Friend';
            // Context depends on what form is currently being typed in. 
            // If panel is right active (Login form visible), user is typing in Login form? 
            // Actually, let's just make it dynamic based on the active side.
            const context = !isRightPanelActive ? 'login' : 'register';
            try {
                const msg = await generateWelcomeMessage(user, context);
                setWelcomeMessage(msg);
            } catch (e) {
                // quiet fail
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [name, email, isRightPanelActive]);

    const togglePanel = (toRight: boolean) => {
        setIsRightPanelActive(toRight);
        // Reset message to default when switching
        if (toRight) {
            setWelcomeMessage("Enter your personal details and start journey with us");
        } else {
            setWelcomeMessage("To keep connected with us please login with your personal info");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-cover" style={{ backgroundImage: `url(${bgImage})` }} >
            <div className="relative w-full max-w-[1000px] min-h-[600px] sm:min-h-[600px] flex items-center justify-center">
                {/* Decorative Background Elements behind the card */}
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 rounded-full mix-blend-multiply filter opacity-70 animate-spin"></div>
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-r from-red-400 to-red-500 rounded-full mix-blend-multiply opacity-70 animate-spin animation-delay-2000"></div>

                {/* Main Container Card */}
                <div className="relative bg-white rounded-[20px] shadow-2xl overflow-hidden w-full min-h-[600px] max-w-full">

                    {/* Sign Up Form Container (Initially on the Right) */}
                    {/* In this CSS model: 
            "Sign Up" container is usually Z-index 1.
            "Sign In" container is Z-index 2.
            The Overlay is Z-index 100.
        */}

                    {/* Form: Create Account (Register) */}
                    {/* We position this on the Right side naturally, or manipulate it with transform */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-full sm:w-1/2 ${!isRightPanelActive ? 'opacity-0 z-10 translate-x-[100%]' : 'opacity-100 z-20 translate-x-[100%]'}`}>
                        <form className="bg-white flex flex-col items-center justify-center h-full px-10 text-center" onSubmit={(e) => e.preventDefault()}>
                            <h1 className="font-bold text-3xl mb-4 text-emerald-500">Create Account</h1>
                            <div className="flex gap-4 mb-6">
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Facebook size={18} /></button>
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Chrome size={18} /></button>
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Linkedin size={18} /></button>
                            </div>
                            <span className="text-xs text-gray-400 mb-6">or use your email for registration:</span>

                            <InputField name="name" type="text" placeholder="Name" icon={User} value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputField name="text" type="email" placeholder="Email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField name="password" type="password" placeholder="Password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <InputField name="conformPassword" type="password" placeholder="Conform Password" icon={Check} value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} />

                            <button className="mt-6 bg-emerald-500 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-emerald-600 transition-transform active:scale-95"
                                onClick={handleRegister}>
                                Sign Up
                            </button>
                        </form>
                    </div>

                    {/* Form: Sign In (Login) */}
                    {/* We position this on the Left side. */}
                    <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-full sm:w-1/2 z-20 ${!isRightPanelActive ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-0 z-10'}`}>
                        <form className="bg-white flex flex-col items-center justify-center h-full px-10 text-center" onSubmit={(e) => e.preventDefault()}>
                            <h1 className="font-bold text-3xl mb-4 text-emerald-500">Sign in to PFM</h1>
                            <div className="flex gap-4 mb-6">
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Facebook size={18} /></button>
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Chrome size={18} /></button>
                                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"><Linkedin size={18} /></button>
                            </div>
                            <span className="text-xs text-gray-400 mb-6">or use your email account:</span>

                            <InputField name="name" type="name" placeholder="User Name" icon={Mail} value={username} onChange={(e) => setUsername(e.target.value)} />
                            <InputField name="password" type="password" placeholder="Password" icon={Lock} value={password} onChange={(e) => setPassword(e.target.value)} />

                            <a href="#" className="text-xs text-gray-400 mt-4 mb-6 border-b border-transparent hover:border-gray-400 transition">Forgot your password?</a>

                            <button className="bg-emerald-500 text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs shadow-lg hover:bg-emerald-600 transition-transform active:scale-95"
                                onClick={handleLogin}>
                                Sign In
                            </button>
                        </form>
                    </div>

                    {/* Overlay Container */}
                    <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 hidden sm:block ${isRightPanelActive ? '-translate-x-full' : 'translate-x-0'}`}>
                        <div className={`bg-gradient-to-r from-emerald-400 to-teal-500 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${isRightPanelActive ? 'translate-x-1/2' : 'translate-x-0'}`}>
                            <WaveGraphic />

                            {/* Left Overlay Panel (Visible when Right Panel is Active -> Login Mode) */}
                            <div className={`absolute flex flex-col items-center justify-center top-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out px-10 text-center ${isRightPanelActive ? 'translate-x-0' : '-translate-x-[20%]'}`}>
                                <h1 className="font-bold text-4xl mb-6 drop-md">Hello, Friend!</h1>
                                <p className="text-sm font-light leading-relaxed mb-8 drop-shadow-sm">{welcomeMessage}</p>
                                <button
                                    onClick={() => togglePanel(false)}
                                    className="bg-transparent border-2 border-white text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs hover:bg-white hover:text-emerald-500 transition-colors"
                                >
                                    Sign In
                                </button>
                            </div>

                            {/* Right Overlay Panel (Visible when Left Panel is Inactive -> Register Mode) */}
                            <div className={`absolute flex flex-col items-center justify-center top-0 right-0 h-full w-1/2 transform transition-transform duration-700 ease-in-out px-10 text-center ${isRightPanelActive ? 'translate-x-[20%]' : 'translate-x-0'}`}>
                                <h1 className="font-bold text-4xl mb-6 drop-md">Welcome Back!</h1>
                                <p className="text-sm font-light leading-relaxed mb-8 drop-shadow-sm">{welcomeMessage}</p>
                                <button
                                    onClick={() => togglePanel(true)}
                                    className="bg-transparent border-2 border-white text-white font-bold py-3 px-10 rounded-full uppercase tracking-wider text-xs hover:bg-white hover:text-emerald-500 transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Toggle Button (Visible only on small screens) */}
                    <div className="absolute top-4 right-4 sm:hidden z-50">
                        <button
                            onClick={() => togglePanel(!isRightPanelActive)}
                            className="text-xs text-gray-500 underline"
                        >
                            {isRightPanelActive ? "Need an account?" : "Already have an account?"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default newLoging;

