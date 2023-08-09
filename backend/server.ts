// TODO: not working because not a module...?
// import express from 'express';
// import cors from 'cors';

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
require('dotenv').config();

// TODO: outsource into database.ts
const db = new sqlite3.Database(
  process.env['NG_APP_DATABASE'],
  sqlite3.OPEN_READWRITE,
  (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Connected to database!');
  }
);

// server-setup (CORS for dev)
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

app.get('/api/recipes', (req: any, res: any) => {
  let ret: any[] = [];

  /* 
    each(sql [, param, ...] [, callback] [, complete])
    callback has signature of "function (err, row) {}"
    after all rows were called a complete-CB will be called 
  */
  db.each(
    'SELECT * FROM recipe', // SQL-stmt
    (err: any, row: any) => ret.push(row), // callback
    () => res.send(ret) // completion callback
  );
  // TODO: logic for opening/closing
  // db.close();
});

const port = 5000;
app.listen(port, () => {
  console.log('Server is running on "http://localhost:' + port + '"');
});
