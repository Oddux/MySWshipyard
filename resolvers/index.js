const pilotResolver = require('./pilot');
const shipResolver = require('./ship');
const ownerResolver = require('./owner');

const owner = (ownerId) => {
    return Owner.findById(ownerId)
      .then((owner) => {
        return { ...owner._doc, _id: owner.id };
      })
      .catch((err) => {
        throw err;
      });
};

const pilot = (pilotId) => {
    return Pilot.findById(pilotId)
      .then((pilot) => {
        return { ...pilot._doc, _id: pilot.id };
      })
      .catch((err) => {
        throw err;
      });
  };

  const ship = (shipId) => {
    return Ship.findById(shipId)
      .then((ship) => {
        return { ...ship._doc, _id: ship.id };
      })
      .catch((err) => {
        throw err;
      });
};
  
const ships = (shipIds) => {
    Ship.find()
      .then((ships) => {
        return ships.map((ship) => {
          return { ...ship._doc, _id: ship._doc._id.toString() };
        });
      })
      .catch((err) => {
        throw err;
      });
};


const rootResolver = {
    ...pilotResolver,
    ...shipResolver,
    ...ownerResolver
};


exports.ship = ship;
exports.pilot = pilot;
exports.owner = owner;
exports.ships = ships;

module.exports = rootResolver;