import { createSlice  } from "@reduxjs/toolkit"; 


const favoriteSlice = createSlice({ 
    name: "favorite",
    initialState: {
        favorites: [],
    },
    reducers: {
        addToFavorites: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(movie => movie.id !== action.payload.id);
        }
    } 

});
    
export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;   