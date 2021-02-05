const mongoose = require('mongoose')
const { Schema } = mongoose

let ProjectSchema = new Schema({
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

module.exports = mongoose.model("Projects", ProjectSchema)