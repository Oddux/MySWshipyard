const buildSchema = require('graphql').buildSchema;

module.exports = buildSchema(`
type AuthData {
    pilotId: ID!
    token: String!
    tokenExpiration: Int!
}

type ownedShips {
    shipName: String!
    shipId: ID!
}

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

type Pilot {
    _id: ID!
    name: String!
    affiliation: String!
    myShips: [ownedShips!]
    email: String!
    password: String
}

input PilotInput {
    name: String!
    affiliation: String!
    myShips: [ownedShips!]
    email: String!
    password: String!
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
    myShips: [ownedShips!]
    login(email: String!, password: String!): AuthData!     
}

type RootMutation {
    createShip(shipInput: ShipInput): Ship
    createPilot(pilotInput: PilotInput): Pilot
    buyShip(shipId: ID!): ownedShips
    sellShip(shipId: ID!): ownedShips
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);
