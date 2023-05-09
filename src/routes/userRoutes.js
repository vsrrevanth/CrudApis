var express = require('express')
var router = express.Router()
const joi = require('joi')
const userController = require("../controller/userController")
const searchUserSchema = require("../schemas/searchUser")
const createUserSchema = require("../schemas/createUser")


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

router.get("/user", async (req,res)=>{
    try{
        var firstname = req.query.firstname;
        console.log(typeof(firstname))
        if(searchUserSchema.validate({firstname:firstname}).error){
            return res.status(400).send(searchUserSchema.validate({firstname:firstname}).error.details)
        }

        const user = await userController.getUser(firstname);
        if(user.length !=0){
            return res.json(user);
        }
        return res.json({"message": "unable to fetch user details"})
    }
    catch(error){
        return res.json({error:error.message})
    }
})

router.post("/user",async (req,res)=>{
    try{
        if(createUserSchema.validate(req.body).error){
            console.log("Invalid schema")
            return res.status(400).send(createUserSchema.validate(req.body).error.details)
        }
        const existingUser = await userController.getUser(req.body.firstname);
        if(existingUser.length!=0){
            console.log("User exists", existingUser)
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

router.put("/user",async (req,res)=>{
    try{
        result = await userController.updateUser(req)
        if(result == true){
            return res.json({"message":"User Updated successfully"})
        }
        return res.json({
            "message":"Failed to update the user",
            error:result
        });
    }
    catch(error){
        res.json({
            "error":error.message
        })
    }
})

router.delete("/user",async (req,res)=>{
    try{
        result = await userController.deleteUser(req);
        if(result == true){
            return res.json({
                "message":"User deleted Successfully"
            })
        }
        return res.json({
            "message":"Failed to delete the user",
            error:result
        });
    }
    catch(error){
        res.json({
            "error":error.message
        })
    }
})



module.exports = router