import { $host, $authHost } from "./index"; // Import $authHost


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
export const refresh=async(NickName, password) => {
    const { data } = await $host.get('http://localhost:5000/api/user/refresh', { NickName, password });
    localStorage.clear('token', data.accessToken); // Store the token
    return data;
};
export const update = async (UserId, NickName, avatar) => { // Accept avatar as a File object
    try {
        const object={
            NickName:NickName,
            avatar:avatar
        }
        console.log(UserId)
        console.log(avatar)
        const { data } = await $host.put(
            `http://localhost:5000/api/user/update/${UserId}`,
            object, // Send FormData
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,  // Important for file uploads
                },
            }
        );
        return data;
    } catch (error) {
        console.error("Error updating user profile:", error.response ? error.response.data : error.message);
        throw error.response?.data || error;
    }
};


