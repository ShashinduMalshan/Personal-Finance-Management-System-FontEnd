import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Login = lazy(() => import("../pages/login"))
const NewLogin = lazy(() => import("../pages/newLoging"))
const Register = lazy(() => import("../pages/register"))
const Dashboard = lazy(() => import("../pages/Dashboard"))




export default function Router() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<AmazingLoader />}> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/dashboard" element={<Dashboard user={""} onLogout={function (): void {
          throw new Error("Function not implemented.")
        } } />} />

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


