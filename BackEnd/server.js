var express = require("express"); //Ensure our express framework has been added
var app = express();
var cors = require('cors');
var bodyParser = require("body-parser"); //Ensure our body-parser tool has been added
var config = require('./config');

app.use(cors());
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

const dbConfig = config.db;

var db = pgp(dbConfig);

// Test connection
db.connect()
  .then((obj) => {
    console.log("Connected to database");
    obj.done(); // success, release connection;
  })
  .catch((error) => {
    console.error("ERROR:", error.message);
  });

// set the view engine to ejs
app.use(express.static(__dirname + "/")); //This line is necessary for us to use relative paths and access our resources directory

// login page
app.get("/", function (req, res) {
  res.send({msg: "Server is running..."});
});

app.get("/todo/all", function (req, res) {
  var query = "SELECT * FROM tasks;";
  db.any(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error("ERROR:", error.message);
      res.status(500).send('Failed to query database');
    });
});

app.get("/todo/id", function (req, res) {
  var id = req.body.id;
  var query = `SELECT * FROM tasks WHERE id = ${id};`;
  db.any(query)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error("ERROR:", error.message);
      res.status(500).send('Failed to query database');
    });
});

app.post("/todo", function (req, res) {
  var title = req.body.title;
  var completed = req.body.completed;
  var statement = `INSERT INTO tasks(title, completed) VALUES('${title}', '${completed}') RETURNING *;`;

  db.any(statement)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      console.error("ERROR:", error.message);
      res.status(500).send('Failed to query database');
    });
});

app.put("/todo", function (req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var completed = req.body.completed;
  var statement = `UPDATE tasks SET title = '${title}', completed =  '${completed}' WHERE id = '${id}' RETURNING *;`;

  db.any(statement)
    .then((results) => {
      res.send(results[0]);
    })
    .catch((error) => {
      console.error("ERROR:", error.message);
      res.status(500).send('Failed to query database');
    });
});


app.delete("/todo/:id", function (req, res) {
  var id = req.params.id;
  var statement = `DELETE FROM tasks WHERE id = ${id};`;

  db.any(statement)
    .then(() => {
      res.send({msg: "Delete successful"});
    })
    .catch((error) => {
      console.error("ERROR:", error.message);
      res.status(500).send('Failed to query database');
    });
});

app.listen(config.port);
console.log(`Server up on port ${config.port}`);
