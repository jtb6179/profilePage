const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Project = new Schema({
    projectTitle: {
        type: String
    },
    description: {
        type: String
    },
    url: {
        type: String
    }
})

module.exports = mongoose.model("projects", Project)