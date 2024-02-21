const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shipSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    max_atmosphering_speed: {
        type: String,
        required: true
    },
    crew: {
        type: String,
        required: true
    },
    passengers: {
        type: String,
        required: true
    },
    cargo_capacity: {
        type: String,
        required: true
    },
    consumables: {
        type: String,
        required: true
    },
    hyperdrive_rating: {
        type: String,
        required: true
    },
    MGLT: {
        type: String,
        required: true
    },
    starship_class: {
        type: String,
        required: true
    }
    });

    mongoose.model("Ship", shipSchema);