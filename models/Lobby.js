const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const lobbySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    topic: String,
    messages: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    friends: [String],
    code: [{ type: Schema.Types.ObjectId, ref: "Code" }],
    creator: String
})

const Lobby = mongoose.model("Lobby", lobbySchema)
module.exports = Lobby