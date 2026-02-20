import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware.js";
import { UserModel,ContentModel } from "./db.js";

import dotenv from "dotenv"
dotenv.config();
const JWT_PASSWORD=process.env.JWT_PASSWORD as string;

const app = express();
app.use(express.json());




//for cheaking
app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});



//sign up endpoint
app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

//signin endpoint
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})



//content generation endpoint
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title=req.body.title;
    await ContentModel.create({
        link:link,
        type:type,
        title:title,
        userId:  new mongoose.Types.ObjectId(req.userId), //  convert to ObjectId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
    
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
});


//to run ts for nodejs
//npm install express
//npm install -D typescript ts-node @types/node @types/express
//npx ts-node src/index.ts -->if this not works then --> 1. npm i -D tsx 2. npx tsx src/index.ts