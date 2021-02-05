const mongoose = require('mongoose')
const Schema = mongoose.Schema

let JobExperience = new Schema({
    position: {
        type: String
    },
    company: {
        type: String
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("JobExperience", JobExperience)