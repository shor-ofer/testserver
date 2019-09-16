var http = require("http");
const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./ofer.db", sqlite3.OPEN_READWRITE, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to  SQlite database.");
});

//create a server object:
http
  .createServer(function(req, res) {
    // open database in memory

    let sql = "SELECT name FROM langs";

    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach(row => {
        res.write(row.name);
      });
    });

    // close the database connection
    db.close(err => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Close the database connection.");
    });
    res.write("Hello Word!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
