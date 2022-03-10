//DataBase Imports
const User = require("../db/models/users")
require("../db/mongoose")
const bcryptjs = require("bcryptjs")
const express = require("express")
const async = require("hbs/lib/async")
const router = new express.Router()

//USER router
router.post("/user", async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
    // user.save().then((user)=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.get("/user", async(req, res)=>{
    try {
        const users = await User.find({})
        if(!users){
            return res.status(404)
        }
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
    // User.find({}).then((users)=>{
    //     if(!users){
    //         return res.status(404).send()
    //     }
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.get("/user/:id", async(req, res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send({Error : "User doesn't exists in database."})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
    // User.findById(_id).then((user)=>{
    //     res.send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // }) 
})

router.patch("/user/:id", async(req, res)=>{
    const allowedFields = ["name", "mob", "age", "password"]
    const providedFields = Object.keys(req.body)
    const isAllowed = providedFields.every((field)=>allowedFields.includes(field))
    if(!isAllowed){
        return res.status(400).send()
    }
    try {
        const user = await User.findById(req.params.id)
        providedFields.forEach((field) => user[field] = req.body[field]);

        user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body , {new: true, runValidators:true})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete("/user/:id", async(req, res)=>{
    try {
        const deleted = await User.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).send()
        }
        res.status(202).send(deleted)
    } catch (error) {
        res.status(500).send()
    }
})
router.post("/user/login", async(req, res)=>{
    try {
        const user = await User.findByUserCredentials(req.body.email, req.body.password)
        res.send(user)      
    } catch (error) {
        res.status(400).send({message:"Unable to login, please try again!!!"})
    }
})

module.exports = router