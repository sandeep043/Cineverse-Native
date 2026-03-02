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

export const getPopularMovies = async () => {
    try {
        const response = await api.get("/movie/popular");
      
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching popular movies:", error);
        throw error;
    }
}

export const getTopRatedMovies = async () => {
    try {
        const response = await api.get("/movie/top_rated");
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching top-rated movies:", error);
        throw error;
    }
} 


export const Trending= async () => {
    try {
        const response = await api.get("/trending/all/day"); 
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
} 

export const searchMovies = async (query) => {
    try {
        const response = await api.get("/search/movie", {   
            params: {
                query: query,
                include_adult: false,
                page:1,
            },
        });
        return response.data.results;
    }   
    catch (error) {
        console.error("Error searching movies:", error);
        throw error;
    }
};





 

