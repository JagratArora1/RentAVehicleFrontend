/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "http://localhost:2237";

export async function apiRequest(endpoint: string, method: string, body?: any) {
    try {
        const isFormData = body instanceof FormData;
        const token = localStorage.getItem("token");
        console.log(token)

        const headers: HeadersInit = isFormData
            ? {}
            : { "Content-Type": "application/json" };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers,
            body: isFormData ? body : body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("API Request Failed:", error);
        throw error;
    }
}

// User-related API calls
export const userApi = {
    saveUser: (userData: any) => apiRequest("api/auth/admin/login", "POST", userData),
    getUser: (uid: string) => apiRequest(`user/get/${uid}`, "GET"),
};
