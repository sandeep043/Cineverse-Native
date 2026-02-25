import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name: "genre",
    initialState: { 
        genres: [],
    },
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
    extraReducers: (builder) => {
        
        // Add any async actions related to genres here
    }
});