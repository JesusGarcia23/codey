const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    sender: [{ type: Schema.Types.ObjectId, ref: "User" }],
    code: String
}, {
        timestamps: true
    })

const Code = mongoose.model("Code", codeSchema)
module.exports = Code