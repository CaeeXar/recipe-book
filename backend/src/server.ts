import express, { Response, Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getRecipe, getRecipes } from "./database";
import { Recipe } from "../../frontend/src/app/types/recipe";

//#region LOGIC

function initServer(): void {
  dotenv.config();
  const PORT: number = Number(process.env.PORT || 4201);

  server = express();
  server.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
    })
  );

  server.listen(PORT, () => {
    console.log('Server started on "http://localhost:' + PORT + '"');
  });
}

function initRoutes(): void {
  server.get("/api/recipes", async (req: Request, res: Response) => {
    let recipes: Recipe[] = await getRecipes();

    // setTimeout(() => res.send(recipes), 1000);
    res.send(recipes);
  });

  server.get("/api/recipes/:id", async (req: Request, res: Response) => {
    if (!req.params?.id) {
      res.send(undefined);
      return;
    }

    const id: number = Number(req.params.id);
    let recipe: Recipe = await getRecipe(id);

    // setTimeout(() => res.send(recipe), 1000);
    res.send(recipe);
  });
}

//#endregion LOGIC

//#region MAIN

let server: express.Application;
initServer();
initRoutes();

//#region MAIN
