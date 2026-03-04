import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendingMoviesThunk } from "../Thunks/trendingThunks";  


const trendingSlice = createSlice({
    name: "trending",
    initialState: { 
        trendingMovies: [],
        loading: false,
        error: null,
        loadingMore: false,
        page: 1,
        totalPages: 0,
    },
    reducers: {
        setTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchTrendingMoviesThunk.pending, (state,action) => {
                const {page} = action.meta.arg || {};
                if(page === 1) {
                    state.loading = true;
                } 
                else{
                    state.loadingMore = true;
                }
            })
            .addCase(fetchTrendingMoviesThunk.fulfilled, (state, action) => {
            const { results, page, total_pages } = action.payload;
        
          

            state.loading = false;
            state.loadingMore = false;
            state.page = page;
            state.totalPages = total_pages;

        if (page === 1) {
        
            state.trendingMovies = results;
        } else {
        
        const existingIds = new Set(state.trendingMovies.map(m => m.id));
        const newMovies = results.filter(movie => !existingIds.has(movie.id));
        state.trendingMovies = [...state.trendingMovies, ...newMovies];
    }
})
            
            .addCase(fetchTrendingMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.loadingMore = false;
            });
    },
});


export const { setTrendingMovies } = trendingSlice.actions;
export default trendingSlice.reducer;