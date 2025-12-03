import { createContext, useContext, useEffect, useState } from 'react';
import { getMyDetails } from '../services/auth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUSer] = useState<any>(null);
    const [loadig, setLogding] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getMyDetails()
                .then((res) => {
                    setUSer(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    setUSer(null);

                })
                .finally(() => {
                    setLogding(false);
                })
        } else {
            setLogding(false);
            setUSer(null);

        }
    } ,[])

    return (
        <AuthContext.Provider value={{ user, setUSer, loadig }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
