const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    points: { type: Number, required: true },
    attributes: { type: Object, required: true },
});

module.exports = mongoose.model('Player', playerSchema);
