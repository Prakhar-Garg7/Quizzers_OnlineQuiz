import { config } from "../../config"

export const login = async (email, password) => {
    try {
        const response = await fetch(`${config.backend_url}/api/auth/login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

        if (response.ok) {
            const data = await response.json()
            return { email, role: data.role };
        } else {
            throw new Error("Login Failed")
        }
    } catch (error) {
        throw new Error(error);
    }
};


export const logout = async () => {
    try {
        const response = await fetch(`${config.backend_url}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        }); 


        if (response.ok) {
            return true; 
        } else {
            throw new Error("Logout Failed");
        }
    } catch (error) {
        throw new Error(error);
    }
};



