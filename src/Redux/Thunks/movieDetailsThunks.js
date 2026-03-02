import { createAsyncThunk } from "@reduxjs/toolkit";
import {getMovieDetails} from "../../services/genreServices";  

export const fetchMovieDetailsThunk = createAsyncThunk(
    "movieDetails/fetchMovieDetails",
    async (movieId, { rejectWithValue }) => {
        try {
            const movieDetails = await getMovieDetails(movieId);
            return movieDetails;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);