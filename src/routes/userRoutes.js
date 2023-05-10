var express = require('express')
var router = express.Router()
const joi = require('joi')
const userController = require("../controller/userController")
const searchUserSchema = require("../schemas/searchUser")
const createUserSchema = require("../schemas/createUser")
const deleteUserSchema = require("../schemas/deleteUser")
const updateUserSchema = require("../schemas/updateUser")

//Get all Users
router.get("/users", async (req, res) => {
    try{
        const users = await userController.getAllUsers();
        if(users){
            return res.status(200).json(users)
        }

        return res.status(400).json({
            error: "unable to retrive users"
        })
    }
    catch(err){
        return res.status(500).json({
            error: err.message
        })
    }
})

//Get User with email
router.get("/user", async (req,res)=>{
    try{
        var email = req.query.email;
        if(searchUserSchema.validate({email:email}).error){
            return res.status(400).send(searchUserSchema.validate({email:email}).error.details)
        }

        const user = await userController.getUser(email);
        if(user){
            return res.json(user);
        }
        return res.status(404).json({"message": "unable to fetch user details"})
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
})

//Create New User
router.post("/user",async (req,res)=>{
    try{
        if(createUserSchema.validate(req.body).error){
            return res.status(400).send(createUserSchema.validate(req.body).error.details)
        }
        const existingUser = await userController.getUser(req.body.email);
        if(existingUser){
            return res.status(400).json({"error": "User already exists"})
        }
        result = await userController.createUser(req)
        if(result == true){
            return res.json({"message":"User successfully Created"})
        }
        return res.json({
            "message":"Unable to create new user",
            error:result});
    }
    catch(error){
        res.json({
            "error":error.message
        })
    }
})

//Update User
router.put("/user",async (req,res)=>{
    try{
        if(!req.query.email){
            return res.status(400).json({"error": "Email missing"})
        }
        if(updateUserSchema.validate(req.body).error){
            return res.status(400).send(updateUserSchema.validate(req.body).error.details)
        }
        var user = await userController.getUser(req.query.email);
        if(user){
            user = await userController.updateUser(req)
            return res.status(200).json({"message":"User updated successfully"});
        }
        else{
            return res.status(404).json({
                "error": `User with email ${req.query.email} doesn't exist`
            })
        }
        
    }
    catch(error){
        res.json({
            "error":error.message
        })
    }
})

//Delete User
router.delete("/user",async (req,res)=>{
    try{
        var email = req.query.email;
        if(deleteUserSchema.validate({email:email}).error){
            return res.status(400).send(deleteUserSchema.validate({email:email}).error.details)
        }
        var user = await userController.getUser(req.query.email);
        if(user){
            await userController.deleteUser(req);
            return res.status(200).json({
                message:"User deleted"
            })
        }else{
            return res.status(404).json({
                "error": `User with email ${req.query.email} doesn't exist`
            })
        }
    }
    catch(error){
        res.json({
            "error":error.message
        })
    }
})



module.exports = router