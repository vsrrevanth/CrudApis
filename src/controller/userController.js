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
var getUser=async (firstname)=>{
    //console.log("userController: "+"The firstname from the request is: "+firstname)
    var rows = await userModel.getUser(firstname);
    if(rows){
        user = rows[0];
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
    var rowsAffected = await userModel.updateUser(req.body, req.query.id);
    console.log(rowsAffected)
    if(rowsAffected>=1){
        return true
    }
    if(rowsAffected==0){
        return "User with such Id doesn't exist to update"
    }
    return rowsAffected;
}

// delete user
var deleteUser = async (req)=>{
    var rowsAffected = await userModel.deleteUser(req.query.id);
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