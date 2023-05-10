// Get Database Connection
const mysql = require("mysql2/promise")
const connection_params = require("../db_config.json")

var getConnection = async ({host, port, database, user, password}) => {
    var connection = await mysql.createConnection({
        host,
        port,
        database,
        user,
        password
     });
     await connection.connect();
     return connection;
}

// Get All Users
var getAllUsers = async () => {
    let sql = `select * from user_details`;
    const conn = await getConnection(connection_params)
    var rows = await conn.query(sql)
    return rows
}

// Get User
var getUser = async (email) => {
    let sql = `select * from user_details where email=?`;
    let values = [email]
    const conn = await getConnection(connection_params);
    var rows = await conn.query(sql,values)
    return rows
}

// Create User
var createUser = async ({firstname,lastname,email,address,phonenumber}) => {
    try{
    let sql = `insert into user_details (FirstName,LastName,email,address,phonenumber) values(?,?,?,?,?)`;
    let values = [firstname,lastname,email,address,phonenumber];
    const conn = await getConnection(connection_params);
    var rows = await conn.query(sql,values)
    rows = rows[0]
    return rows['affectedRows'];
    }
    catch(error){
        return error;
    }
}

// Update User
var updateUser = async (fields, email) => {
    try{
        const oldUserObj = getUser(email);
        if(Object.keys(fields).length == 0){
            return oldUserObj;
        }  
        var updates = []
        for(var column of Object.keys(fields)){
            updates.push(`${column}='${fields[column]}'`);
        }
        var updateQuery = "UPDATE user_details SET "+updates.join(",")+" WHERE email='"+email+"';";
        const conn = await getConnection(connection_params);
        await conn.query(updateQuery);
        const newUserObj = getUser(email);
        return newUserObj;
        }
    
    catch(error){
        return error;
    }
}

// Delete User
var deleteUser = async (email) => {
    try{
    let sql = `delete from user_details where email = ?`;
    let values = [email]
    const conn = await getConnection(connection_params);
    var rows = await conn.query(sql,values)
    rows = rows[0];
    return rows['affectedRows'];
    }
    catch(error){
        return error;
    }
}

module.exports = {
    getConnection,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}


