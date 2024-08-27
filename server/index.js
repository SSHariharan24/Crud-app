const express = require("express");
const user = require('./sample.json');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
const port = 8000
//console.table(users);

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PATCH","DELETE"],
}))

app.get("/users",(req,res)=>{
    return res.json(user);
})

//delete user details

app.delete("/users/:id",(req,res)=>{
    let id = Number(req.params.id)
    let filteredUsers = user.filter((userr)=>userr.id !== id)
    fs.writeFile("./sample.json",JSON.stringify(filteredUsers),(err,data)=>{
    return res.json(filteredUsers);
})
})

//add new  user

app.post("/users",(req,res)=>{
    let{name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"all fields required"})
    }
    let id = Date.now();
    user.push({id,name,age,city})
    fs.writeFile("./sample.json",JSON.stringify(user),(err,data)=>{
        return res.json({ message: "User details added success"})
    })
    
})

app.patch("/users/:id",(req,res)=>{
    let id = Number(req.params.id)
    let{name,age,city} = req.body;
    if(!name || !age || !city){
        res.status(400).send({message:"all fields required"})
    }
    
   let index = user.findIndex((userr)=>userr.id == id)
   user.splice(index,1,{...req.body})
    fs.writeFile("./sample.json",JSON.stringify(user),(err,data)=>{
        return res.json({ message: "User details updated success"})
    })
    
})

app.listen(port,(err)=>{
    console.log(`App is running is port ${port}`);
    
})
