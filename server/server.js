import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected ✅"))
.catch(err=>console.log(err));

app.get("/api/health",(req,res)=>{
    res.json({status:"Server running ✅"});
});

app.listen(process.env.PORT,()=>console.log("Server running"));
