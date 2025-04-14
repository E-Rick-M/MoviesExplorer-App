import express, { type Request, type Response } from "express";

import prisma from "../utils/prismaclient.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await prisma.movie.findMany();
  // .then((movies) => {
  //     console.log(movies);
  //     return movies;
  // }
  // )

  const data = movies;

  res.json({ message: "Fetched Movies successfully", data });
});

router.post("/", async (req: Request, res: Response) => {
  const { title, description, category, imageUrl, releaseDate } = req.body;
  console.log("Received data:", req.body);

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
  if (!imageUrl) {
    errors.push("Image URL is required");
  }
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  let releaseDateValue = new Date();
  if (releaseDate) {
    releaseDateValue = new Date(releaseDate);
  }

  const Newmovie = await prisma.movie.create({
    data: {
      title,
      description,
      category,
      releaseDate: releaseDateValue,
      imageUrl,
    },
    select: {
        id: true,
        title: true,
        description: true,
        category: true,
        releaseDate: true,
        imageUrl: true,
        isFavorite: true,
        createdAt: true,
        updatedAt: true,
    }
  });
  console.log("New movie created:", Newmovie);
  console.log("Movie saved in DB:", Newmovie);
  console.log("Sending back new movie:", Newmovie);

  res
    .status(200)
    .json({ message: "Movie created successfully", data: Newmovie });
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const data = movie;
  res.json({ message: "Fetched Movie successfully", data });
});

router.put("/:id", async (req: Request, res: Response) => {
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

  const movieExists = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!movieExists) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const movie = await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      description,
      category,
    },
  });

  const data = movie;

  res.json({ message: "Movie updated successfully", data });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const movieExists = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!movieExists) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  const movie = await prisma.movie.delete({
    where: {
      id: Number(id),
    },
  });

  const data = movie;
  res.json({ message: "Movie deleted successfully", data });
});

export default router;
