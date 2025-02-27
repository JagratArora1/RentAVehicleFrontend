const BASE_URL = "http://localhost:2237/api"; 

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiRequest(endpoint: string, method: string, body?: any) {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    saveUser: (userData: any) => apiRequest("api/auth/admin/login", "POST", userData),
    getUser: (uid: string) => apiRequest(`user/get/${uid}`, "GET"),
};