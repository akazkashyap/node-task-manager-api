const mongoose = require("mongoose")

const Task = mongoose.model("Task",{
    title:{
        type:String,
        required:[true, "Task title is required."],
        minLength:1
    },
    completed:{
        type:Boolean,
        required :true,
        default:false
    },
    date:{
        type:String,
        default : Date
    }
})

module.exports = Task