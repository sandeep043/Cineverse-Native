import { createAsyncThunk } from "@reduxjs/toolkit";
import {getGenres} from "../../services/genreServices";  
import { getMoviesByGenre } from "../../services/genreServices";    


export const fetchGenresThunk = createAsyncThunk(
    "genre/fetchGenres",
    async (_, { rejectWithValue }) => {
        try {
            const genres = await getGenres();
            return genres;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
); 


export  const fetchMoviesByGenreThunk = createAsyncThunk(
    "genre/fetchMoviesByGenre",
    async (genreId, { rejectWithValue }) => {   
        try {
            const movies = await getMoviesByGenre(genreId);
            return movies;
        } catch (error) {
            return rejectWithValue(error.message);
        }       
    }
);  


