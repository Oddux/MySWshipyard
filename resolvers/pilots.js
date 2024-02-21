const bcrypt = require("bcryptjs");

const Pilot = require("../models/pilots.js");
const Ship = require("../models/ships.js");
const { ship, owner } = require("./index.js");
const { PilotInput } = require("../models/pilots.js");



module.exports = {
    createPilot: (args) => {
        return Pilot.findOne({ email: args.pilotInput.email })
          .then((pilot) => {
            if (pilot) {
              throw new Error("Pilot exists already.");
            }
            return bcrypt.hash(args.pilotInput.password, 12);
          })
          .then((hashedPassword) => {
            const pilot = new Pilot({
              name: args.pilotInput.name,
              affiliation: args.pilotInput.affiliation,
              ownedShips: args.pilotInput.ships,
              email: args.pilotInput.email,
              password: hashedPassword,
            });
            return pilot.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },};