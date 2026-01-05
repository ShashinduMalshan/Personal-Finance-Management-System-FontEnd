import { createContext, useContext, useEffect, useState } from 'react';
import { getMyDetails } from '../services/auth';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    console.log("Auth loading:", loading);
    console.log("User:", user);

    useEffect(() => {
        console.log("Auth useEffect started");

        const token = localStorage.getItem('accessToken');
        console.log("Token:", token);

        if (token) {
            console.log("Calling getMyDetails...");
            getMyDetails()
                .then((res) => {
                    console.log("API success", res);
                    setUser(res.data.data);
                })
                .catch((err) => {
                    console.log("API error", err);
                    setUser(null);
                })
                .finally(() => {
                    console.log("Auth loading finished");
                    setLoading(false);
                });
        } else {
            console.log("No token");
            setLoading(false);
            setUser(null);
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
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
