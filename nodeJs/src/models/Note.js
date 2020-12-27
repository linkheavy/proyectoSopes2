const mongoose = require('mongoose');
const { schema }  = mongoose;

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    date: {type: Date, default: Date.now},
    user:{ type: String}
});

module.exports = mongoose.model('Note',NoteSchema);