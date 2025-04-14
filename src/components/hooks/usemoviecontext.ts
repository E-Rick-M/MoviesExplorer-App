import { createContext, use } from "react";
import {type MoviesContextValue } from "../../store/store";
// import { movieContext } from "../../store/store";


export const movieContext = createContext<MoviesContextValue | null>(null);


export const useMovieContext=()=>{
    const context = use(movieContext);
    if (!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
}