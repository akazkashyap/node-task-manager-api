const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User", {
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim : true,
        required:true,
        minLength:[8,"Password too short"],
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password Error: 'Password' is a weak password, please try a different combination.")
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Age Error : Age can not be zero or less than zero.")
            }
        }
    },
    mob:{
        type:String,
        validate(value){
            if(!validator.isMobilePhone(value, "en-IN")){
                throw new Error("Mobile no. Error : Please check again and enter a valid number.")
            }
        }
    }
})

module.exports = User