import { createAsyncThunk } from "@reduxjs/toolkit";
import {getPopularMovies} from "../../services/genreServices"; 


export const fetchPopularMoviesThunk = createAsyncThunk(
    "popular/fetchPopularMovies",
    async (_, { rejectWithValue }) => { 
        try {
            const popularMovies = await getPopularMovies();
            return popularMovies;
        } catch (error) {
            return rejectWithValue(error.message);
        }   
    }
);