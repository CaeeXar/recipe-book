// TODO: not working because not a module...?
// import express from 'express';
// import cors from 'cors';

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// TODO: outsource into database.ts
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE lorem (id INTEGER, info TEXT, test TEXT)');

  const stmt = db.prepare('INSERT INTO lorem VALUES (?, ?, ?)');
  for (let i = 0; i < 10; i++) {
    stmt.run(i, 'Ipsum ' + i, 'HIC SEDET');
  }
  stmt.finalize();
});

// server-setup (CORS for dev)
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:4200'],
  })
);

app.get('/api/test', (req: any, res: any) => {
  let ret: any[] = [];

  /* 
    each(sql [, param, ...] [, callback] [, complete])
    callback has signature of "function (err, row) {}"
    after all rows were called a complete-CB will be called 
  */
  db.each(
    'SELECT * FROM lorem', // SQL-stmt
    (err: any, row: any) => {
      console.log(row);
      ret.push(row);
    }, // callback
    () => res.send(ret) // completion callback
  );

  // TODO: logic for opening/closing
  // db.close();
});

const port = 5000;
app.listen(port, () => {
  console.log('server running on http://localhost:' + port);
});
