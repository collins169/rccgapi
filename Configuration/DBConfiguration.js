const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');
const mysql= require('mysql');


const connection = mysql.createConnection({
    host:prop.get('database.hostname'),
    user: prop.get('database.username'),
    password: prop.get('database.password'),
    database: prop.get('database.dbname')
});

connection.connect((err)=>{
    if(!err)
    console.log('======== Database Connection Established ===========');
    else
    console.log(`Failed to establish connection: ${JSON.stringify(err,undefined,2)}`);
}); 

module.exports = connection;



