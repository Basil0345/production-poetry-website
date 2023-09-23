const mongoose = require('mongoose');
const { Schema } = mongoose;

const PoemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    }
});

const Poem = mongoose.model("poem", PoemSchema);
module.exports = Poem;