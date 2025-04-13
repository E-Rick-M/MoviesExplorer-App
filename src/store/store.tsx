import { createContext, useContext, useEffect, useState } from "react";

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
    deleteAt?: Date | null,
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
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}

type MoviesContextValue=MovieState & {
  addMovie: (movie: AddMovie) => void,
  updateMovie: (id: number, updatedMovie: Partial<Movie>) => void,
  DeleteMovie: (id: number) => void
}

 const movieContext = createContext<MoviesContextValue | null>(null);


export const useMovieContext = () => {
  const context = useContext(movieContext);
  if (!context ) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
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
         

        const data = await response.json();
        console.log("Fetched Movies:", data.movies);
        setMovies(data.movies as Movie[]);
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
      const tid=Math.floor(Math.random()*100000)

      const newMovie = {
        ...movie,
        id: tid,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
             
        setMovies((prevMovies) => [...prevMovies,newMovie]);
      try {
        const response = await fetch("http://localhost:3000/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        });
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        const data = await response.json();

        setMovies((prevMovies)=>prevMovies.map(movie=>movie.id===tid?data.movies:movie))

        console.log("Added Movie:", data.movie);

      } catch (error) {
        setMovies((prevMovies)=>prevMovies.filter(movie=>movie.id !==tid))
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
        const data = await response.json();
        console.log("Updated Movie:", data.movie);
        // setMovies((prevMovies) =>
        //   prevMovies.map((movie) => (movie.id === id ? data.movie : movie))
        // );
      } catch (error) {
        console.error("Error updating movie:", error);
      }
    }
    ,
    DeleteMovie: async (id: number) => {
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
      }
    },
    setMovies
  };
  return (
 
    <movieContext.Provider value={value}>
      {children}
    </movieContext.Provider>
  );
}


