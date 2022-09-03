import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const axiosInstance = axios.create({
        baseURL: "https://cs3219-task-b-361315.as.r.appspot.com",
    });

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get("/api/quotes");
            setResponse(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { response, isLoading };
};

export default useFetchData;
