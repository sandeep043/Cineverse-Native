import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetailsThunk } from "../Thunks/movieDetailsThunks"; 

const movieDetailsSlice = createSlice({
    name: "movieDetails",
    initialState: { 
        movieDetails: [],
        loading: false,
        error: null, 
    },
    reducers: {
        setMovieDetails: (state, action) => {
            state.movieDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovieDetailsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchMovieDetailsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.movieDetails = action.payload;
        });
        builder.addCase(fetchMovieDetailsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;


