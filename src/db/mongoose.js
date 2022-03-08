const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser:true,
}).catch((error)=>{
    console.log("Connection Error (Try restarting mongodb server)",error)
})