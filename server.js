const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const knex = require("knex");

app.use(cors());
app.use(bodyParser.json());

// database connection
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "11221233123",
    database: "dbPortal",
  },
});

// portal requests
const login = require('./controllers/portal/login');

app.post("/login", (req, res) => {
  login.handleLogin(req, res, db);
});

const port = 3001;
app.listen(port, () => {
    console.log("listening to port " + port);
});