//File or modules imports
const express = require("express")

//ROUTERS
const taskRoute = require("./routes/taskRouter")
const userRouter = require("./routes/userRouter")

const app = express()

app.use(express.json())
app.use(taskRoute)
app.use(userRouter)

//Port configuring
const port = process.env.PORT || 3000

app.get("", (req, res)=>{
    res.send("Welcome to Task Manager api")
})
//Listener on port
app.listen(port,()=>{
    console.log("Listening on port : ",port)
})


// const Task = require("./db/models/tasks")
// const User = require("./db/models/users")

// const main = async()=>{
//     // const task = await Task.findById("6232d18de0ee2904cdf5ecd7")

//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById("6232d0ec344cbcbf51212175")
//     await user.populate("tasks")
//     console.log(user.tasks)
// }
// main()