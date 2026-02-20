import express from "express";
import { UserModel } from "./db.js";

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



app.listen(3000, () => {
  console.log("Server running on port 3000");
});


//to run ts for nodejs
//npm install express
//npm install -D typescript ts-node @types/node @types/express
//npx ts-node src/index.ts -->if this not works then --> 1. npm i -D tsx 2. npx tsx src/index.ts