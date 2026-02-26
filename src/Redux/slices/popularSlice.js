import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMoviesThunk } from "../Thunks/popularThunks";

const popularSlice = createSlice({ 
    name: "popular",
    initialState: {
        popularMovies: [],
        loading: false,
        error: null,
    },
    reducers: { 
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        }},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
               
            })
            .addCase(fetchPopularMoviesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.popularMovies = action.payload;
             
            })
            .addCase(fetchPopularMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
             
            });
    },
});

export const { setPopularMovies } = popularSlice.actions;
export default popularSlice.reducer;

