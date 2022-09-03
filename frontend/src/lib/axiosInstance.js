import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://cs3219-task-b-361315.as.r.appspot.com",
});

export default axiosInstance;
