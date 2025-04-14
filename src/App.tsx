

import './App.css'
import AddMovies from './components/AddMovies';
import Header from './components/header'
import { useMovieContext } from './components/hooks/usemoviecontext';
import MovieCard from './components/Movies';

// import MovieCard from './components/movieCard'
function App() {

  const { movies,loading, error} = useMovieContext();
  console.log(movies ,'movies');

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  if (movies.length === 0) {
    return <div className="text-center">No movies found.</div>;
  }
  return (
    <div className='w-screen bg-gray-800 text-white'>
     <Header />
      <main className="container mx-auto p-4 w-full">
        <h1 className="text-3xl font-bold text-center mt-2 p-4 text-white">Welcome to Movie Explorer</h1>
        <p className="mt-4 text-center">Explore your favorite movies and add new ones!</p>
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold text-center">Featured Movies</h2>
          {/* Movie list or grid will go here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-4 mx-auto w-full">
            {/* Example movie card */}
            {movies.length>0 && movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
              // <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
              //   <h3 className="text-xl font-semibold">{movie.title}</h3>
              //   <p className="mt-2">{movie.description}</p>
              //   <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">View Details</button>
              // </div>
            ))}
            {/* Example movie card */}
            {/* <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">{movies.title}</h3>
              <p className="mt-2">Description of the movie goes here.</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">View Details</button>
            </div> */}
            {/* Repeat for more movies */}
            {/* <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">Another Movie</h3>
              <p className="mt-2">Description of another movie goes here.</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">View Details</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">Yet Another Movie</h3>
              <p className="mt-2">Description of yet another movie goes here.</p>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">View Details</button>
            </div> */}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Add a New Movie</h2>
          {/* Form to add a new movie */}
        <AddMovies />
        </div>
      </main>
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <p>&copy; 2023 Movie Explorer. All rights reserved.</p>
        <p>Built with React and Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
