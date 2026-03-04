import { createAsyncThunk } from "@reduxjs/toolkit";
import {getTopRatedMovies} from "../../services/genreServices";  
import { Trending } from "../../services/genreServices";


export const fetchTrendingMoviesThunk = createAsyncThunk(
    "trending/fetchTrendingMovies",
    async (page = 1, { rejectWithValue }) => {
        try {
            const trendingMovies = await Trending(page);
           
            return trendingMovies;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }   
    }
); 
