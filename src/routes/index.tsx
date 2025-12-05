import { lazy, Suspense, use, useState, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"

const NewLogin = lazy(() => import("../pages/newLoging"))
const Dashboard = lazy(() => import("../pages/Dashboard"))

type RequiredAuthType = { children: ReactNode, username?: string[] }

const RequiredAuth = ({ children }: RequiredAuthType) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>User Loading...</div>
  }
  if (!user) {
    return <Navigate to="/newlogin" replace />
  }
  // If roles are provided, ensure the user has at least one required role

  return <>{children}</>
}



export default function Router() {


  const { user,loading} = useAuth();


  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );


  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");

    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading user data...
      </div>
    );
  }
  
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<AmazingLoader />}> */}
      <Routes>
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/dashboard" element={
          <RequiredAuth>
            <Dashboard
              user={"Guest"} // pass only the username as a string
              onLogout={() => console.log(user)}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          </RequiredAuth>
        } />

        {/*          
          <Route path="/home" element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>} /> */}



      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  )
}


