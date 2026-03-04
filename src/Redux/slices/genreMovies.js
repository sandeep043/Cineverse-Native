import { createSlice } from "@reduxjs/toolkit"; 
import { fetchMoviesByGenreThunk } from "../Thunks/genreThunks";

const genreMoviesSlice = createSlice({
    name: "genreMovies",
    initialState: {
        genreMovies: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesByGenreThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByGenreThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.genreMovies = action.payload;
            })
            .addCase(fetchMoviesByGenreThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
}); 

export default genreMoviesSlice.reducer;    
