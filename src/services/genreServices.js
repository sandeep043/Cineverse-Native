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


export const Trending = async (page = 1) => {
    try {
        const response = await api.get("/trending/all/day", {
            params: {
                page: page
            },
        }); 
        return response.data;
    }
    catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
}
 

export const getMovieDetails = async (movieId) => { 
    try {
        const response = await api.get(`/movie/${movieId}`); 
        return response.data;
    } 
    catch (error) {
        console.error(`Error fetching details for movie ID ${movieId}:`, error);
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

export const getMoviesByGenre = async (genreId) => {
    try {
        const response = await api.get("/discover/movie", { 
            params: {
                with_genres: genreId,
                page:1, 
            },
        });
        return response.data.results;
    }   
    catch (error) {
        console.error(`Error fetching movies for genre ID ${genreId}:`, error);
        throw error;
    }   
};  