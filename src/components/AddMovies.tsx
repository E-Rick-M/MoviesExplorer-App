import { useActionState } from "react";
import Input from "./input";
import { useMovieContext } from "./hooks/usemoviecontext";
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

    const {addMovie}=useMovieContext()

const handleSubmit=(prevState:InitialState |null,formData:FormData)=>{
    const Data=Object.fromEntries(formData.entries())
    console.log(formData)
    const { title, description, imageUrl, category, releaseDate } = Data;
    const errors:string[] = [];
    if (!title) {
        errors.push("Title is required");
    }
    if (!description) {
        errors.push("Description is required");
    }
    if (!imageUrl) {
        errors.push("ImageUrl is required");
    }
    if (!category) {
        errors.push("Category is required");
    }
    if (!releaseDate) {
        errors.push("ReleaseDate is required");
    }
    if (errors.length > 0) {
        return {
          errors,
          enteredValues: {
            title: String(title),
            description: String(description),
            imageUrl: String(imageUrl),
            category: String(category),
            releaseDate: String(releaseDate)
          }
        };
      }
    const movie={
        title: String(title),
        description: String(description),
        imageUrl: String(imageUrl),
        category: String(category),
        releaseDate: new Date(releaseDate.toString()),
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    addMovie({...movie})

    console.log(movie ,'movie Added')
    return {errors:[] , enteredValues: {title: '', description:'', imageUrl:'', category:'', releaseDate:''}};
}

const initialState:InitialState={
    errors: [],
    enteredValues: {
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        releaseDate: ''
    }
}

const [FormState,formAction]=useActionState(handleSubmit,initialState)

  return (
    <form className="bg-white shadow-md rounded-lg p-4 mt-4" action={formAction}>
      <div className="mb-4">
        <Input type="text" name="title" label="Title" id="Title" defaultValue={FormState && FormState.enteredValues.title } />
      </div>
      <div className="mb-4">
        <Input type="text" name="description" label="Description" id="Description" isTextArea defaultValue={FormState && FormState.enteredValues.description } />
        {/* <textarea className="border rounded w-full py-2 px-3"></textarea> */}
      </div>
      <div className="mb-4">
        <Input type="text" name="imageUrl" label="imageUrl" id="ImageUrl" defaultValue={FormState && FormState.enteredValues.imageUrl } />
      </div>
      <div className="mb-4">
        <Input type="text" name="category" label="category" id="Category" defaultValue={FormState && FormState.enteredValues.category }/>
      </div>
      <div className="mb-4">
        <Input type="date" name="releaseDate" label="releaseDate" id="ReleaseDate" defaultValue={FormState && FormState.enteredValues.releaseDate }/>
      </div>
      {FormState?.errors && FormState.errors.length > 0 && (
        <div className="text-red-500 mb-4">{FormState.errors.map((error, index) => (
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
