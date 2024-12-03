import { $host, $authHost } from "./index"; // Import $authHost
import {jwtDecode} from "jwt-decode";

export const registration = async (NickName, password) => {
    const { data } = await $host.post('http://localhost:5000/api/user/registration', { NickName, password });
    localStorage.setItem('token', data.accessToken); // Store the token immediately after registration
    return data; // Decode the access token
};

export const login = async (NickName, password) => {
    const { data } = await $host.post('http://localhost:5000/api/user/login', { NickName, password });
    localStorage.setItem('token', data.accessToken); // Store the token
    return data;
};
export const logout=async(NickName, password) => {
    const { data } = await $host.post('http://localhost:5000/api/user/logout', { NickName, password });
    localStorage.clear('token', data.accessToken); // Store the token
    return data;
};
