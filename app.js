require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { buildSchema } = require("graphql");
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require("mongoose");
const Ship = require("./models/ship");


const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Ship {
            _id: ID!
            model: String!
            manufacturer: String!
            length: String!
            max_atmosphering_speed: String!
            crew: String!
            passengers: String!
            cargo_capacity: String!
            consumables: String!
            hyperdrive_rating: String!
            MGLT: String!
            starship_class: String!
        }

        input ShipInput {
            model: String!
            manufacturer: String!
            length: String!
            max_atmosphering_speed: String!
            crew: String!
            passengers: String!
            cargo_capacity: String!
            consumables: String!
            hyperdrive_rating: String!
            MGLT: String!
            starship_class: String!
        }

        type RootQuery {
            ships: [Ship!]!            
        }

        type RootMutation {
            createShip(shipInput: ShipInput): Ship
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }`),
    rootValue: {
      ships: () => {
        return [ships];
      },
      createShip: (args) => {
        const ship = new Ship({
          model: args.shipInput.model,
          manufacturer: args.shipInput.manufacturer,
          length: args.shipInput.length,
          max_atmosphering_speed: args.shipInput.max_atmosphering_speed,
          crew: args.shipInput.crew,
          passengers: args.shipInput.passengers,
          cargo_capacity: args.shipInput.cargo_capacity,
          consumables: args.shipInput.consumables,
          hyperdrive_rating: args.shipInput.hyperdrive_rating,
          MGLT: args.shipInput.MGLT,
          starship_class: args.shipInput.starship_class,
        });
        return ship;
      },
    },
    graphiql: true,
  })
);

mongoose
    .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.agniuxh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
    app.listen(3000);
    })
    .catch((err) => {
    console.log(err);
    });