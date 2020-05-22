var express = require("express"); //Ensure our express framework has been added
var app = express();
var bodyParser = require("body-parser"); //Ensure our body-parser tool has been added

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const initOptions = {
  // global event notification;
  error(error, e) {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};

//Create Database Connection
var pgp = require("pg-promise")(initOptions);

const dbConfig = {
  host: "localhost",
  port: 5432,
  database: "todo",
  user: "postgres",
  password: "psql",
};

var db = pgp(dbConfig);

// Test connection
db.connect()
  .then((obj) => {
    console.log("Connected to database");
    obj.done(); // success, release connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message);
  });

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/")); //This line is necessary for us to use relative paths and access our resources directory

// login page
app.get("/", function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.send("Hello World");
});

app.get("/test", function (req, res) {
  var query = "SELECT * FROM tasks;";
  db.any(query)
    .then((rows) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.send(rows);
    })
    .catch((error) => {
      console.log("ERROR:", error.message);
      request.flash("error", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.send("failed to query database");
    });
});

app.post("/test", function (req, res) {
  var title = req.body.title;
  var completed = req.body.completed;
  var statement = `INSERT INTO tasks(title, completed) VALUES('${title}', '${completed}');`;

  db.any(statement)
    .then((info) => {
      res.statusCode = 200;
      res.send(info);
    })
    .catch((error) => {
      console.log("ERROR:", error.message);
      request.flash("error", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.send("failed to query database");
    });
});

app.delete("/test", function (req, res) {
  var id = req.body.id;
  var statement = `DELETE FROM tasks WHERE id = ${id};`;

  db.any(statement)
    .then((info) => {
      res.statusCode = 200;
      res.send(info);
    })
    .catch((error) => {
      console.log("ERROR:", error.message);
      request.flash("error", err);
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.send("failed to query database");
    });
});

app.listen(3000);
console.log("Server up on port 3000");
