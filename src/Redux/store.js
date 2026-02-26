import { configureStore} from "@reduxjs/toolkit"; 
import genreReducer from "./slices/genreSlice";
import popularReducer from "./slices/popularSlice"; 
import topRatedReducer from "./slices/topRatedSlice";
import trendingReducer from "./slices/trendingSlice";

export const store = configureStore({
    reducer: {
        genre: genreReducer,  
        popular: popularReducer,  
        topRated: topRatedReducer,  
        trending: trendingReducer,  
    },
});  

