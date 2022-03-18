//DataBase imports
require("../db/mongoose")
const Task = require("../db/models/tasks")

const auth = require("../middleware/auth")

const express = require("express")
const router = new express.Router()

// TASK Routes
router.post("/task", auth, async(req, res)=>{

    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.get("/task", auth, async(req, res)=>{
    try {
        const tasks = await Task.find({owner:req.user._id})
        // await req.user.populate("tasks")
        if(!tasks.length){
            return res.status(404).send({Error : "Perhaps there is no task to show! :("})
        }
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.get("/task/:id", auth, async(req, res)=>{

    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner:req.user._id})
        if(!task){
            return res.status(404).send({Error:"Opps task doesn't exists in database."})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch("/task/:id", auth, async(req, res)=>{
    const allowedFields = ["title", "completed"]
    const providedFields = Object.keys(req.body)
    const allowUpdate = providedFields.every((field)=>allowedFields.includes(field))
    
    if(!allowUpdate){
        return res.status(400).send()
    }
    try {
        const task = await Task.findOne({_id:req.params.id , owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        providedFields.forEach((update)=>task[update] = req.body[update])
        await task.save()
        
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


router.delete("/task/:id", auth, async(req, res)=>{
    try {
        const deleted = await Task.deleteOne({_id:req.params.id, owner:req.user._id})
        if(deleted.deletedCount == 0){
            return res.status(404).send("not found!!")
        }
        res.status(202).send(deleted)
                
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router