import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware.js";
import { UserModel,ContentModel, LinkModel } from "./db.js";

import dotenv from "dotenv"
import { random } from "./utils.js";

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



//get content
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const content = await ContentModel.find({
      userId: req.userId
    }).populate("userId", "username");

    return res.status(200).json({
      content
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
});



//delete content
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const contentId = req.body.contentId;

    if (!contentId) {
      return res.status(400).json({
        message: "Content ID required"
      });
    }

    if (!req.userId) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await ContentModel.deleteOne({
      _id: contentId,
      userId: req.userId
    });

    return res.status(200).json({
      message: "Deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
});

//generate link
app.post('/api/v1/brain/share',userMiddleware, async(req,res)=>{
  try {
    if(!req.userId){
      return res.status(403).json({message:"Unauthorize"})
    }

    const share=req.body.share;
    if(share){

      const existingLink=await LinkModel.findOne({
        userId: req.userId
      })
      if(existingLink){
        res.json({hash:existingLink.hash});
        return;
      }
      const hash=random(10);
      await LinkModel.create({
        userId: req.userId,
        hash: hash
      })
      res.json({hash})

    }else{

      await LinkModel.deleteOne({
        userId: new mongoose.Types.ObjectId(req.userId)
      })
      res.status(401).json({message:"link deleted successfully"})
    }

  } catch (error) {

    return res.status(500).json({
      message: "Something went wrong"
    });
  }
})



app.listen(3000, () => {
  console.log("Server running on port 3000");
});


//to run ts for nodejs
//npm install express
//npm install -D typescript ts-node @types/node @types/express
//npx ts-node src/index.ts -->if this not works then --> 1. npm i -D tsx 2. npx tsx src/index.ts