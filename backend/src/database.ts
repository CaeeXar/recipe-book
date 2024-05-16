import dotenv from "dotenv";
import * as sqlite3 from "sqlite3";
import { Recipe } from "../../frontend/src/app/types/recipe";

//#region MAIN

dotenv.config();
const database: sqlite3.Database = new sqlite3.Database(
  process.env.DATABASE!,
  //   "D:/SQLite/databases/RecipeDB.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Connection to database etablished.");
  }
);

//#endregion MAIN

//#region QUERIES

export async function getRecipes(): Promise<Recipe[]> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM RECIPE;`;
    database.all(query, (error: Error, rows: Recipe[]) => {
      if (error) reject(error);
      resolve(rows as Recipe[]);
    });
  });
}

export async function getRecipe(id: number): Promise<Recipe> {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM recipe WHERE id = ?;`;
    database.get(query, [id], (error: Error, row: Recipe) => {
      if (error) {
        console.log(error);
        reject(undefined);
      }

      resolve(row as Recipe);
    });
  });
}

//#endregion QUERIES
