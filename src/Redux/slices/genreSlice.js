import { createSlice } from "@reduxjs/toolkit";
import { fetchGenresThunk } from "../Thunks/genreThunks";

const genreSlice = createSlice({
    name: "genre",
    initialState: { 
        genres: [],
        loading: false,
        error: null,
    },
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchGenresThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchGenresThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.genres = action.payload;
        });     
        builder.addCase(fetchGenresThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });     
        
        
    }
});

export const { setGenres } = genreSlice.actions;    
export default genreSlice.reducer;  