import { useState } from "react";
import Input from "./input";
import { useMovieContext } from "../store/store";
import Button from "./button";
// type Inputs={
//     title: string,
//     description: string,
//     imageUrl: string,
//     category: string,
//     releaseDate: string
// }

interface EnteredValues {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    releaseDate: string;
}

interface InitialState {
    errors: string[] | [];
    enteredValues: EnteredValues;
}

export default function AddMovies() {
    const [formState, setFormState] = useState<InitialState>({
        errors: [],
        enteredValues: {
          title: '',
          description: '',
          imageUrl: '',
          category: '',
          releaseDate: ''
        }
      });
    const {addMovie}=useMovieContext()

// const handleSubmit=(prevState:InitialState |null,formData:FormData)=>{
//     const Data=Object.fromEntries(formData.entries())
//     console.log(formData)
//     const { title, description, imageUrl, category, releaseDate } = Data;
//     const errors:string[] = [];
//     if (!title) {
//         errors.push("Title is required");
//     }
//     if (!description) {
//         errors.push("Description is required");
//     }
//     if (!imageUrl) {
//         errors.push("ImageUrl is required");
//     }
//     if (!category) {
//         errors.push("Category is required");
//     }
//     if (!releaseDate) {
//         errors.push("ReleaseDate is required");
//     }
//     if (errors.length > 0) {
//         return {
//           errors,
//           enteredValues: {
//             title: String(title),
//             description: String(description),
//             imageUrl: String(imageUrl),
//             category: String(category),
//             releaseDate: String(releaseDate)
//           }
//         };
//       }
//     const movie={
//         title: String(title),
//         description: String(description),
//         imageUrl: String(imageUrl),
//         category: String(category),
//         releaseDate: new Date(releaseDate.toString()),
//         isFavorite: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }

//     addMovie({...movie})

//     console.log(movie ,'movie Added')
//     return {errors:[] , enteredValues: {title: '', description:'', imageUrl:'', category:'', releaseDate:''}};
// }

// const initialState:InitialState={
//     errors: [],
//     enteredValues: {
//         title: '',
//         description: '',
//         imageUrl: '',
//         category: '',
//         releaseDate: ''
//     }
// }

// const [FormState,formAction]=useActionState(handleSubmit,initialState)

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { title, description, imageUrl, category, releaseDate } = data;
    const errors: string[] = [];

    if (!title) errors.push("Title is required");
    if (!description) errors.push("Description is required");
    if (!imageUrl) errors.push("ImageUrl is required");
    if (!category) errors.push("Category is required");
    if (!releaseDate) errors.push("ReleaseDate is required");

    if (errors.length > 0) {
      setFormState({
        errors,
        enteredValues: {
          title: String(title),
          description: String(description),
          imageUrl: String(imageUrl),
          category: String(category),
          releaseDate: String(releaseDate)
        }
      });
      return;
    }

    const movie = {
      title: String(title),
      description: String(description),
      imageUrl: String(imageUrl),
      category: String(category),
      releaseDate: new Date(releaseDate.toString()),
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Optimistic update
    await addMovie({ ...movie });

    setFormState({
      errors: [],
      enteredValues: {
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        releaseDate: ''
      }
    });
  };


  return (
    <form className="bg-white shadow-md rounded-lg p-4 mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <Input type="text" name="title" label="Title" id="title" defaultValue={formState && formState.enteredValues.title } />
      </div>
      <div className="mb-4">
        <Input type="text" name="description" label="Description" id="description" isTextArea defaultValue={formState && formState.enteredValues.description } />
        {/* <textarea className="border rounded w-full py-2 px-3"></textarea> */}
      </div>
      <div className="mb-4">
        <Input type="text" name="imageUrl" label="imageUrl" id="imageUrl" defaultValue={formState && formState.enteredValues.imageUrl } />
      </div>
      <div className="mb-4">
        <Input type="text" name="category" label="category" id="category" defaultValue={formState && formState.enteredValues.category }/>
      </div>
      <div className="mb-4">
        <Input type="date" name="releaseDate" label="releaseDate" id="releaseDate" defaultValue={formState && formState.enteredValues.releaseDate }/>
      </div>
      {formState?.errors && formState.errors.length > 0 && (
        <div className="text-red-500 mb-4">{formState.errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}</div>
        )}
      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Movie
      </Button>
    </form>
  );
}
