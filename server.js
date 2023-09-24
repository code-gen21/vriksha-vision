const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userRoutes=require("./routes/userRoutes");

const path=require("path");

const app=express();
require('dotenv').config();

app.use(cors());  // using app.use middleware

app.use(express.json()); 

app.use("/api/auth",userRoutes);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, 
}).then(()=>{
    console.log("DB connection successfully"); 
}).catch((err)=>{
    console.log(err.message);
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server Started on Port ${process.env.PORT}`);
});

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});