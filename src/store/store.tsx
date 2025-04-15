import { useEffect, useState } from "react";
import { movieContext } from "../components/hooks/usemoviecontext";

export type Movie = {
    id: number,
    title :string,
    description: string,
    imageUrl :string,
    category :string,
    releaseDate :Date,
    isFavorite :boolean,
    createdAt :Date,
    updatedAt: Date,
    deletedAt?: Date | null,
};

interface AddMovie{
    title :string,
    description: string,
    imageUrl :string,
    category :string,
    releaseDate :Date,
    isFavorite :boolean,
    createdAt :Date,
    updatedAt: Date,
}

type MovieState = {
    movies: Movie[] | [],
    loading: boolean,
    error: string | null,
}

export type MoviesContextValue=MovieState & {
  addMovie: (movie: AddMovie) => void,
  updateMovie: (id: number, updatedMovie: Partial<Movie>) => void,
  DeleteMovie: (id: number) => void
}




export const MovieProvider =({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => { 
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
         

        const {data,message}= await response.json();
        // JSON.parse(data)
        console.log("Fetched Movies:", data);
        console.log("Fetched Movies message:", message);
        setMovies(data as Movie[]);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies");
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);

  const value = {
    movies,
    loading,
    error,
    addMovie: async (movie: AddMovie) => {
      try {
        const response = await fetch("http://localhost:3000/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({...movie}),
        });
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        const {data: movieAdded, message} = await response.json();
        setMovies((prevMovies) => [...prevMovies, movieAdded]);
        console.log("Response movieAdded-Frontend:", movieAdded);
        console.log("Response message-Frontend:", message);
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    },
    updateMovie: async (id: number, updatedMovie: Partial<Movie>) => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMovie),
        });
        if (!response.ok) {
          throw new Error("Failed to update movie");
        }
        const {data} = await response.json();
        console.log("Updated Movie:", data);
        // setMovies((prevMovies) =>
        //   prevMovies.map((movie) => (movie.id === id ? data.movie : movie))
        // );
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    }
    ,
    DeleteMovie: async (id: number) => {
      setMovies((prevMovies) =>prevMovies.filter((movie) => movie.id !== id));
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
        // setMovies((prevMovies) =>
        //   prevMovies.filter((movie) => movie.id !== id)
        // );
      } catch (error) {
        console.error("Error deleting movie:", error);
        // Rollback the state change in case of an error
        setMovies((prevMovies) => [
          ...prevMovies,
          movies.find((movie) => movie.id === id)!,
        ]);
      }
    },
  };
  return (
 
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  );
}


