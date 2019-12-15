var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
var Schema = mongoose.Schema
var studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    hobbies:{
        type:String
    }
})
module.exports = mongoose.model('Student',studentSchema)