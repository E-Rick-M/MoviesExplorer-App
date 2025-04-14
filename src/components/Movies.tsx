
import { type Movie } from "../store/store";
import Button from "./button";
import { useMovieContext } from "./hooks/usemoviecontext";

const MovieCard = ({ movie }: { movie: Movie }) => {
    const {DeleteMovie} = useMovieContext()
//   const date = (date: Date) => {
//     return date.toLocaleDateString("en-Us", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };
  const handleDelete = () => {
   DeleteMovie(movie.id)
    console.log("Delete movie Successfully:", movie.id);
  };

    const handleEdit = () => {
        console.log("Edit movie:", movie.id);
    };
  return (
    <div className="flex flex-col justify-between items-center bg-gray-600 shadow-md rounded-lgp-1 p-4 w-4/4">
      {/* <h3 className="text-3xl font-semibold text-black text-center">{movie.title}</h3> */}
      <div className="h-75 rounded-lg mb-4 w-full ">
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="flex h-full flex-col justify-between items-center text-center p-2 w-full">
        <div className="flex flex-col justify-around h-full items-center p-1">
          <h3 className="text-2xl font-semibold text-white">{movie.title}</h3>
          <p className="mt-2 text-lg text-gray-300 h-full">
            {movie.description}
          </p>
        </div>
        <div className="items-end">
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            View Details
          </button>
        </div>
      </div>

      {/* <div className="text-gray-400 mt-2 text-sm">
        {date(new Date(movie.releaseDate))}
      </div>
      <div className="text-gray-400 mt-2 text-sm">{movie.category}</div>
      <div className="text-gray-400 mt-2 text-sm">
        {movie.isFavorite ? "⭐️" : "☆"}
      </div>
      <div className="text-gray-400 mt-2 text-sm">
        {date(new Date(movie.createdAt))}
      </div>
      <div className="text-gray-400 mt-2 text-sm">
        {date(new Date(movie.updatedAt))}
      </div> */}
      <div className="flex flex-row justify-center items-center mt-4 space-x-2 p-2 w-full">
        <Button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-200 cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded"
          onClick={handleEdit}
        >
          Edit
        </Button>
        {/* <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
            Favorite
        </button> */}
        {/* <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Unfavorite
        </button> */}
      </div>
    </div>
  );
};
export default MovieCard;
