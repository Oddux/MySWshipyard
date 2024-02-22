const Owner = require("../models/owners.js");
const Ship = require("../models/ships.js");

module.exports = {
  owners: () => {
    return Owner.find()
      .then((owners) => {
        return owners.map((owner) => {
          return { ...owner._doc, _id: owner.id };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

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

  buyShip: async (args, req) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
    const fetchedShip = await Ship.findOne({ _id: args.shipId });
    const owner = new Owner({
      pilot: req.pilotId,
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
  
  sellShip: async (args, req) => {
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
  