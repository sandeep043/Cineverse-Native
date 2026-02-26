import { createSlice } from "@reduxjs/toolkit";
import { fetchTopRatedMoviesThunk } from "../Thunks/topRatedThunks"; 


const topRatedSlice = createSlice({
    name: "topRated",
    initialState: {
        topRatedMovies: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopRatedMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTopRatedMoviesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.topRatedMovies = action.payload;
            })
            .addCase(fetchTopRatedMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setTopRatedMovies } = topRatedSlice.actions;
export default topRatedSlice.reducer;