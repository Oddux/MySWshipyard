const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Pilot = require("../models/pilots.js");

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
    },
    
  login: async ({ email, password }) => {
      const pilot = await Pilot.findOne({ email: email });
      if (!pilot) {
          throw new Error("Pilot/Password is incorrect!");
      }
      bcrypt.compare(password, pilot.password).then((isEqual) => {
          if (!isEqual) {
              throw new Error("Pilot/Password is incorrect!");
          }
          const token = jwt.sign(
              { pilotId: pilot.id, email: pilot.email }, 'wonkwonkwonkwonk', {
                  expiresIn: '1h'
              });
          return { pilotId: pilot.id, token: token, tokenExpiration: 1 };
      });
    },
};
