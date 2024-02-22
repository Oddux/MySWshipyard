const path = require('path');
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const mongoose = require('mongoose');
const graphQlSchema = require("./schemas/index.js");
const graphQlResolvers = require("./resolvers/index.js");
const isAuth = require("./utils/is-auth.js");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
    }
);

app.use(isAuth);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.agniuxh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(8000);
  })

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
  })
);



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas cluster');
});

module.exports = db;