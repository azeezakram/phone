import axios from "axios";

const axiosInsence = axios.create({
    baseURL: "http://localhost:8080"
})

export default axiosInsence