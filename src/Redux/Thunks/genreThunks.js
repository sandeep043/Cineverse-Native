import { createAsyncThunk } from "@reduxjs/toolkit";
import {getGenres} from "../../services/genreServices"; 


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

