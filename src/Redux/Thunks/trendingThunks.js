import { createAsyncThunk } from "@reduxjs/toolkit";
import {getTopRatedMovies} from "../../services/genreServices";  

export const fetchTrendingMoviesThunk = createAsyncThunk(
    "trending/fetchTrendingMovies",
    async (_, { rejectWithValue }) => {
        try {
            const trendingMovies = await getTopRatedMovies();
           
            return trendingMovies;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }   
    }
); 
