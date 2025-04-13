
import express, { type Request, type Response } from 'express';

import prisma from '../utils/prismaclient.ts';

const router = express.Router();

router.get('/',async (req, res) => {
    const movies=await prisma.movie.findMany()
        .then((movies) => { 
            console.log(movies);
            return movies;
        }
        )

     res.json({ message: "Fetched Movies successfully" , movies });
});


router.post('/',async (req:Request, res:Response) => {
    const {title,description,category} =req.body;


    const errors=[]
    
    if(!title){
        errors.push("Title is required")
    }

    if(!description){
        errors.push("Description is required")
    }
    if(!category){
        errors.push("Category is required")
    }
    if(errors.length>0){
        res.status(400).json({errors})
        return
    }
    console.log("Title",title)
    console.log("Description",description)
    console.log("Category",category)

    const movie=await prisma.movie.create({
        data:{
            title,
            description,
            category,
            releaseDate:new Date('2023-10-01')
        }
    })
    res.json({ message: "Movie created successfully", movie });
});


router.get('/:id',async (req:Request, res:Response) => {
    const { id } = req.params;
    const movie=await prisma.movie.findUnique({
        where:{
            id:Number(id)
        }
    })
    if(!movie){
        res.status(404).json({ message: "Movie not found" });
        return
    }
    res.json({ message: "Fetched Movie successfully", movie });
});


router.put('/:id',async (req:Request, res:Response) => {
    const { id } = req.params;
    const { title, description, category } = req.body;

    const errors = [];

    if (!title) {
        errors.push("Title is required");
    }

    if (!description) {
        errors.push("Description is required");
    }
    if (!category) {
        errors.push("Category is required");
    }
    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const movie = await prisma.movie.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            description,
            category
        }
    });
    res.json({ message: "Movie updated successfully", movie });
}
);


router.delete('/:id',async (req:Request, res:Response) => {
    const { id } = req.params;
    const movie=await prisma.movie.delete({
        where:{
            id:Number(id)
        }
    })
    res.json({ message: "Movie deleted successfully", movie });
});


export default router;
