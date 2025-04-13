import express, {type NextFunction, type Request,type Response  } from "express";
import  router  from "./routes/routes.ts"; 

const app = express();

// const server=`http"://localhost:3000"`;
// const port=3000

app.use(express.json());

app.use('/movies',router)

app.use((err: Error, req: Request, res: Response,next:NextFunction) => {
    console.log(next)
    console.error(err.stack);
     res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 at http://localhost:3000");
});
