import { lazy, Suspense, useState, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";
import SidebarLayout from "../Components/SidebarLayout";

const NewLogin = lazy(() => import("../pages/newLoging"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Income = lazy(() => import("../pages/IncomeManagement"));


type RequiredAuthType = { children: ReactNode };

const RequiredAuth = ({ children }: RequiredAuthType) => {
  const { user, loading } = useAuth();

  if (loading) return <div>User Loading...</div>;
  if (!user) return <Navigate to="/newlogin" replace />;

  return <>{children}</>;
};

export default function Router() {
  const { user, loading } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  // if (loading) return <div>Loading user data...</div>;

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>

        <Routes>

          {/* Public Login */}
          <Route path="/newlogin" element={<NewLogin />} />

          {/* Protected layout */}
          <Route element={<SidebarLayout />}>

            <Route
              path="/dashboard"
              element={
                <RequiredAuth>
                  <Dashboard
                    user={user?.username || "Guest"}
                    onLogout={() => console.log("Logging out...")}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                  />
                </RequiredAuth>
              }
            />
            <Route path="/income" element={<RequiredAuth><Income /></RequiredAuth>} />


          </Route>

        </Routes>

      </Suspense>
    </BrowserRouter>
  );
}
