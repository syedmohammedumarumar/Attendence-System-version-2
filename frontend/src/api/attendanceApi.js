import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const fetchAttendance = async (userId, password) => {
    const response = await axios.post(`${API_BASE}/attendance/`, {
        user_id: userId,
        password: password,
    });
    return response.data;
};