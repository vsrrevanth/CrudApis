const userModel = require('../model/userModel')

// get all users
var getAllUsers = async () => {
    var rows = await userModel.getAllUsers();
    if(rows){
        users = rows[0];
        return users
    }
    return null
}
// get user
var getUser=async (email)=>{
    //console.log("userController: "+"The firstname from the request is: "+firstname)
    var rows = await userModel.getUser(email);
    var results = rows[0]
    if(results){
        user = results[0];
        return user
    }
    return null
}

// create user
var createUser= async (req,res)=>{
    var rowsAffected = await userModel.createUser(req.body);
    if(rowsAffected>=1){
        return true;
    }
    return rowsAffected;
}

// update user
var updateUser = async (req)=>{
    var user = await userModel.updateUser(req.body, req.query.email);
    if(user){
        user = user[0][0];
        return user;
    }
    return null
}

// delete user
var deleteUser = async (req)=>{
    var rowsAffected = await userModel.deleteUser(req.query.email);
    if(rowsAffected>=1){
        return true;
    }
    if(rowsAffected==0){
        return "User with such ID doesn't exist"
    }
    return rowsAffected;
}

module.exports = {
    getAllUsers, 
    getUser,
    createUser,
    updateUser,
    deleteUser
}