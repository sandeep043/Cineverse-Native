import { createSlice } from "@reduxjs/toolkit";  

import { searchMoviesThunk } from "../Thunks/searchThunk";  
import { clear } from "react-native/types_generated/Libraries/LogBox/Data/LogBoxData";

const searchSlice = createSlice({
    name: "search",
    initialState: { 
        results: [],
        loading: false,
        error: null,
    },  
    reducers: {
        setSearchResults: (state, action) => {
            state.results = action.payload;
        },
        clearSearchResults: (state) => {
            state.results = [];
            state.error = null;
        }   
    },
    extraReducers: (builder) => {
        builder.addCase(searchMoviesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });     
        builder.addCase(searchMoviesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.results = action.payload;
        }

        );
        builder.addCase(searchMoviesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });         
    }
}); 

export const { setSearchResults,clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer; 