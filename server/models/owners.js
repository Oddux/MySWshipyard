const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    pilot: {
        type: Schema.Types.ObjectId,
        ref: 'Pilot'
    },
    ownedShips: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ship'
        }
    ]
});

module.exports = mongoose.model('Owner', ownerSchema);