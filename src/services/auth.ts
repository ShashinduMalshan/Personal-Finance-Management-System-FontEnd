import api from "./api";

type RegisterDataType = {
    username: string;
    email: string;
    password: string;
}

export const registerUser = async (data: RegisterDataType) => {
    const res = await api.post('/auth/register', data);
    return res;
}

export const login = async ( username: string , password: string  ) => {
    const res =await api.post('/auth/login', {username ,password} )
    return res;
}

export const getMyDetails = async () => {
    const res = await api.get('/auth/me');
    return res;
}