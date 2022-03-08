//DataBase imports
const Task = require("../db/models/tasks")
require("../db/mongoose")

const express = require("express")
const router = new express.Router()

// TASK Routes
router.post("/task", async(req, res)=>{
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

router.get("/task", async(req, res)=>{
    try {
        const tasks = await Task.find({})
        if(!tasks){
            return res.status(404).send({Error : "Perhaps there is no task to show! :("})
        }
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.find({}).then((tasks)=>{
    //     if(!tasks){
    //         return res.status(404).send()
    //     }
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.get("/task/:id", async(req, res)=>{
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send({Error:"Opps task doesn't exists in database."})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.findById(_id).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
router.patch("/task/:id", async(req, res)=>{
    const allowedFields = ["title", "completed"]
    const providedFields = Object.keys(req.body)
    const allowUpdate = providedFields.every((field)=>allowedFields.includes(field))
    if(!allowUpdate){
        return res.status(400).send()
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete("/task/:id", async(req, res)=>{
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id)
        if(!deleted){
            return res.status(404).send()
        }
        res.status(202).send(deleted)
        
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router