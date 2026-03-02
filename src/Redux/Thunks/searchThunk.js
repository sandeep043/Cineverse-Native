import {createAsyncThunk} from '@reduxjs/toolkit';
import {searchMovies} from '../../services/genreServices';     
export const searchMoviesThunk = createAsyncThunk(
    'search/searchMovies',
    async (query, {rejectWithValue}) => {
        try {
            const results = await searchMovies(query);
            return results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);