import axios from "axios";

export const taskAPI= axios.create(
    {
        baseURL:import.meta.env.VITE_REACT_APP_BACKEND_URL
    }
)