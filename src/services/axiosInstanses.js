import axios  from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
}); 

api.interceptors.request.use((config)=>{
    config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2Y2M2YxMTEyMzJhN2M1MDVlMTViN2JmZjVmMjkwNCIsIm5iZiI6MTcyNDI1ODM0NC42NTEsInN1YiI6IjY2YzYxODI4OTc2MTBiOWI1Y2UwMzMyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c0t7t89zViamdBPkOZv-upqt-aJNcRihtxi2PWyPfZg';
    return config;
},
(error)=>{
    console.log("Request error:", error);   
    return Promise.reject(error);
}
) 

export default api; 