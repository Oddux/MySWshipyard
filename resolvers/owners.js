const Owner = require("../models/owners.js");
const Ship = require("../models/ships.js");
const { ship, pilot } = require("./index.js");
const { OwnerInput } = require("../models/owners.js");


module.exports = {
    ownedShips: (args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
      return Owner.find({ pilot: args.pilotId })
        .then((ownedShips) => {
          return ownedShips.map((ownedShip) => {
            return { ...ownedShip._doc, _id: ownedShip.id };
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    takeOwnership: async (args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
      const fetchedShip = await Ship.findOne({ _id: args.shipId });
      const owner = new Owner({
        pilot: "5f4a5f6c7e0b7b3c0c4c7d0e",
        ownedShips: [
          {
            shipId: fetchedShip._id,
          },
        ],
      });
      return owner
        .save()
        .then((result) => {
          return {
            ...result._doc,
            pilot: pilot.bind(this, result._doc.pilot),
            ship: ship.bind(this, result._doc.ownedShips[0].shipId),
            _id: result.id,
          };
        })
        .catch((err) => {
          throw err;
        });
    },
    releaseOwnership: async (args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
      return Owner.findByIdAndRemove(args.shipId)
        .then((result) => {
          return { ...result._doc, _id: result.id };
        })
        .catch((err) => {
          throw err;
        });
    },
};
  