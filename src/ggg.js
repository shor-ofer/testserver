const sqlite3 = require("sqlite3").verbose();

// open database in memory
let db = new sqlite3.Database("./ofer.db", sqlite3.OPEN_READWRITE, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to  SQlite database.");
});
db.run("CREATE TABLE IF NOT EXISTS langs(name text)");
db.run("INSERT INTO langs(name) VALUES(?)", ["C"], function(err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log("A row has been inserted with rowid ${this.lastID}");
});

let sql = "SELECT count(*) FROM langs";

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach(row => {
    console.log(row.count);
  });
});

// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
