const Ship = require("../models/ships.js");

module.exports ={
    ships: () => {
        return Ship.find()
        .then((ships) => {
            return ships.map((ship) => {
                return { ...ship._doc, _id: ship.id };
            });
        })
        .catch((err) => {
            throw err;
        });
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
        return ship
        .save()
        .then((result) => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
    },
};