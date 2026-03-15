require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const Note = require("./models/Note")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))

app.post("/api/notes", async (req,res)=>{

    const note = new Note({
        text:req.body.text
    })

    await note.save()

    res.json(note)

})

app.get("/api/notes", async (req,res)=>{

    const notes = await Note.find()

    res.json(notes)

})

app.delete("/api/notes/:id", async (req,res)=>{

    await Note.findByIdAndDelete(req.params.id)

    res.json({message:"deleted"})

})

const PORT = 5000

app.listen(PORT,()=>console.log("Server running"))