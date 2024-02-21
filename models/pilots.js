const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pilotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    affiliation: {
        type: String,
        required: true
    },
    ownedShips: [
        {
            type: Schema.Types.ObjectId,
            ref: "Ship"
        }
    ],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    });

    module.exports = mongoose.model("Pilot", pilotSchema);