import { Axios } from "axios"; 
import api from "./axiosInstanses"; 
export const getGenres = async () => {
    try {
        const response = await api.get("/genre/movie/list");    
        return response.data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }   
}

 

