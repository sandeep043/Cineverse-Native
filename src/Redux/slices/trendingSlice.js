import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingMoviesThunk } from "../Thunks/trendingThunks";  


const trendingSlice = createSlice({
    name: "trending",
    initialState: { 
        trendingMovies: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchTrendingMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrendingMoviesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingMovies = action.payload;
            })
            .addCase(fetchTrendingMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { setTrendingMovies } = trendingSlice.actions;
export default trendingSlice.reducer;