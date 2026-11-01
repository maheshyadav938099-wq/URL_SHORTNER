import mongoose from "mongoose";

//Url database Schema
const urlSchema = new mongoose.Schema({
    sorturlid: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    view_history: [
        {
            timestamps: {
                type: Number
            }
        }
    ]
})

const URL = mongoose.model("url", urlSchema)

//export
export default URL;