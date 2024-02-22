const pilotResolver = require('./pilots');
const shipResolver = require('./ships');
const ownerResolver = require('./owners');

const pilot = (pilotId) => {
  return Pilot.findById(pilotId)
    .then((pilot) => {
      return { ...pilot._doc, _id: pilot.id };
    })
    .catch((err) => {
      throw err;
    });
};

const owner = (ownerId) => {
    return Owner.findById(ownerId)
      .then((owner) => {
        return {
          ...owner._doc,
          _id: owner.id,
          pilot: pilot.bind(this, owner._doc.pilot),
          ownedShips: ships.bind(this, owner._doc.ownedShips),
        };
      })
      .catch((err) => {
        throw err;
      });
}

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
module.exports = rootResolver;