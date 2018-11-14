const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const mailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    message: String
})
module.exports = mongoose.model("mail", mailsSchema)