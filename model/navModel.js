const mongoose = require('./core.js')

const NavSchema = mongoose.Schema({
    title: { type: String },
    link: { type: String },
    position: { type: Number },
    is_opennew: { type: Number },
    sort: { type: Number },
    status: { type: Number, default: 1 },
    add_time: {
        type: Number,
    }
})

module.exports = mongoose.model("Nav", NavSchema, "nav")