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
    let sql = `select * from users`;
    const conn = await getConnection(connection_params)
    var rows = await conn.query(sql)
    return rows
}

// Get User

var getUser = async (firstname) => {
    let sql = `select * from users where FirstName=?`;
    let values = [firstname]
    const conn = await getConnection(connection_params);
    var rows = await conn.query(sql,values)
    return rows
}

// Create User

var createUser = async ({firstname,lastname,email,address,phonenumber}) => {
    try{
    let sql = `insert into users (FirstName,LastName,email,address,phonenumber) values(?,?,?,?,?)`;
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

var updateUser = async (fields, id) => {
    console.log()
    try{
        if(Object.keys(fields).length == 0){
            return 0;
        }  
        var updates = []
        for(var column of Object.keys(fields)){
            updates.push(`${column}='${fields[column]}'`);
        }
        var updateQuery = "UPDATE users SET "+updates.join(",")+" WHERE id="+id+";";
        const conn = await getConnection(connection_params);
        var rows = await conn.query(updateQuery);
        rows = rows[0];
        console.log("rows: "+rows['affectedRows'])
        return rows['affectedRows'];
        }
    
    catch(error){
        console.error(error)
            return error;
    }
}

// Delete User
var deleteUser = async (id) => {
    try{
    let sql = `delete from users where id = ?`;
    let values = [id]
    const conn = await getConnection(connection_params);
    var rows = await conn.query(sql,values)
    rows = rows[0];
    console.log(rows);
    return rows['affectedRows'];
    }
    catch(error){
        console.error(error);
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


