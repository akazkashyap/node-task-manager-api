//File or modules imports
const express = require("express")

//ROUTERS
const taskRoute = require("./routes/taskRouter")
const userRouter = require("./routes/userRouter")
const async = require("hbs/lib/async")

const app = express()
app.use(express.json())
app.use(taskRoute)
app.use(userRouter)

//Port configuring
const port = process.env.PORT || 3000

//Listener on port
app.listen(port,()=>{
    console.log("Listening on port : ",port)
})