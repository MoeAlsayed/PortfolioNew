const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const mailsSchema = new Schema({
    name: String,
    mail: {
        type: String,
        lowercase: true,
        trim: true,
    },
    message: String
})
module.exports = mongoose.model("mail", mailsSchema)