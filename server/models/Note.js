const mongoose = require("mongoose")

//defining structure of a note

const NoteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    content:{
        type:String,
        default:""
    },
    linksTo:[{
        type:String
    }]

},{timestamps:true});

//create a model called note using the noteschema, this allows it be usable anywhere
module.exports = mongoose.model('Note', NoteSchema);
