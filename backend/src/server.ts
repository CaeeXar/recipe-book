import express, { Application } from "express";
import cors from "cors";
import * as sqlite3 from "sqlite3";
// require("dotenv").config();

const db = new sqlite3.Database(
  // process.env["NG_APP_DATABASE"],
  "D:/SQLite/databases/RecipeDB.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Connected to database!");
  }
);

const app: Application = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);

app.get("/api/recipes", (req, res) => {
  let ret: any[] = [];

  db.each(
    "SELECT * FROM recipe", // SQL-stmt
    (err: any, row: any) => ret.push(row), // callback
    () => res.send(ret) // completion callback
  );
});

app.get("/api/recipes/:id", (req: any, res: any) => {
  if (!req.params?.id) {
    res.send({});
    return;
  }

  const id: number = Number(req.params.id);
  let ret: any[] = [];
  /*
    each(sql [, param, ...] [, callback] [, complete])
    callback has signature of "function (err, row) {}"
    after all rows were called a complete-CB will be called
  */
  db.each(
    "SELECT * FROM recipe", // SQL-stmt
    (err: any, row: any) => {
      if (row.id === id) ret.push(row);
    }, // callback
    () => res.send(ret.length > 0 ? ret[0] : undefined) // completion callback
  );
});

const port = 5000;
app.listen(port, () => {
  console.log('Server started on "http://localhost:' + port + '"');
});
