const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const ships = [];


app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
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
    rootValue: 
    {
        ships: () => {
            return [ships];
        },
        createShip: (args) => {
            const ship = {
                _id: Math.random().toString(),
                model: args.model,
                manufacturer: args.manufacturer,
                length: args.length,
                max_atmosphering_speed: args.max_atmosphering_speed,
                crew: args.crew,
                passengers: args.passengers,
                cargo_capacity: args.cargo_capacity,
                consumables: args.consumables,
                hyperdrive_rating: args.hyperdrive_rating,
                MGLT: args.MGLT,
                starship_class: args.starship_class
            };
            ships.push(ship);
        }
    },
    graphiql: true
}));