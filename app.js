import '.styles/app.css';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            ships: [String!]!
            
        }

        type RootMutation {
            createShip(shipInput: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }`),
    rootValue: 
    {
        ships: () => {
            return ['Millennium Falcon', 'X-Wing', 'TIE Fighter'];
        },
        createShip: (args) => {
            const shipName = args.shipInput;
            return shipName;
        }
    },
    graphiql: true
}));