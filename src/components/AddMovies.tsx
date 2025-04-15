import { useActionState, useState } from "react";
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
    const {addMovie} = useMovieContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
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

        await addMovie({...movie});
        
        // Reset form
        e.currentTarget.reset();
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

    return (
        <form className="bg-white shadow-md rounded-lg p-4 mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input type="text" name="title" label="Title" id="Title" defaultValue={formState.enteredValues.title} />
            </div>
            <div className="mb-4">
                <Input type="text" name="description" label="Description" id="Description" isTextArea defaultValue={formState.enteredValues.description} />
            </div>
            <div className="mb-4">
                <Input type="text" name="imageUrl" label="imageUrl" id="ImageUrl" defaultValue={formState.enteredValues.imageUrl} />
            </div>
            <div className="mb-4">
                <Input type="text" name="category" label="category" id="Category" defaultValue={formState.enteredValues.category} />
            </div>
            <div className="mb-4">
                <Input type="date" name="releaseDate" label="releaseDate" id="ReleaseDate" defaultValue={formState.enteredValues.releaseDate} />
            </div>
            {formState.errors.length > 0 && (
                <div className="text-red-500 mb-4">
                    {formState.errors.map((error: string, index: number) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
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
