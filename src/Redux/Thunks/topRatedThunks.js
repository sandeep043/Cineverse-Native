import { createAsyncThunk } from "@reduxjs/toolkit";
import {getTopRatedMovies} from "../../services/genreServices";  


export const fetchTopRatedMoviesThunk = createAsyncThunk(
    "topRated/fetchTopRatedMovies",
    async (_, { rejectWithValue }) => {
        try {
            const topRatedMovies = await getTopRatedMovies();

            console.log("Fetched top-rated movies:", topRatedMovies );
            return topRatedMovies;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);