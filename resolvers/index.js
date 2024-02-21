const bcrypt = require("bcryptjs");

const Ship = require("../models/ship");
const Pilot = require("../models/pilot");

module.exports = {
    ships: () => {
        Ship.find()
          .then((ships) => {
            return ships.map((ship) => {
              return { ...ship._doc, _id: ship._doc._id.toString() };
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
          });
      },
        createPilot: (args) => {
            return Pilot.findOne({ email: args.pilotInput.email }).then(pilot => {
                if (pilot) {
                    throw new Error("Pilot exists already.");
                }
                return bcrypt.hash(args.pilotInput.password, 12);
            })
            .then(hashedPassword => {
                const pilot = new Pilot({
                    name: args.pilotInput.name,
                    affiliation: args.pilotInput.affiliation,
                    ownedShips: args.pilotInput.ships,
                    email: args.pilotInput.email,
                    password: hashedPassword
                });
                return pilot.save();
            })
            .then(result => {
                return { ...result._doc, password: null, _id: result.id };
            })
            .catch((err) => {
                throw err;
            });
        },
    };