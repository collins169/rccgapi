const connect= require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');

function checkPhone(phone, callback){
    console.log("====================== Inside check phone ==================");
    console.log("Phone: "+phone);
    connect.query('SELECT * FROM amb_worker_table WHERE Phone_Number = ?', [phone], (err, rows, fields) => {
        // console.log(rows);
        if(!err)
            if(rows.length == 0)
                callback(true);
            else
                callback(false);
        else
            console.log(err);
    });
}
function checkEmail(email, callback){
    console.log("====================== Inside check email ==================");
    console.log("email: "+email);
    connect.query('SELECT * FROM amb_worker_table WHERE email = ?', [email], (err, rows, fields) => {
        // console.log(rows);rs
        if(!err)
            if(rows.length == 0)
                callback(true);
            else
                callback(false);
        else
            callback(err);
    });
}
function checkFullname(name, callback){
    console.log("====================== Inside check fullname ==================");
    console.log("name: "+name);
    connect.query('SELECT * FROM amb_worker_table WHERE Full_Name = ?',[name], (err, rows, fields) => {
        // console.log(rows.length);
        if(!err)
            if(rows.length == 0)
                callback(true);
            else
                callback(false);
        else
            callback(err);
    });
}


module.exports = {
    getWorkers: function(callback){
        console.log("====================== Inside get all Worker ==================");
        try{
            connect.query('SELECT * FROM amb_worker_table WHERE deleted = 0',(err,rows, fields) => {
                response.errorMsg = `1,No data found`;
                if(!err)
                    if(!rows.length == 0)
                        callback(rows);
                    else 
                        callback(response);
                else
                    callback(err);
            });
        }catch (error){
            console.log(error);
        }
    },

    getWorkersById: function(id, callback){
        console.log("====================== Inside get Worker by id==================");
        console.log("id: "+id);
        try{
            connect.query('SELECT * FROM amb_worker_table WHERE id = ?',[id],(err, rows, fields)=> {
                response.errorMsg = `1,No Data Found for Id ${id}`;
                if(!err)
                    if(!rows.length == 0)
                        callback(rows);
                    else
                        callback(response);
                else
                    callback(err);
            });
        }catch(error){
            console.log(error);
        }
    },
    searchWoker: function(param, callback){
        console.log("====================== Inside Search Worker ==================");
        console.log("Param: "+param)
        try{
            connect.query('SELECT id AS _id, Full_Name, Phone_Number, Home_Address, email, dob, martial_status, gender FROM amb_worker_table WHERE Full_Name LIKE ? OR Phone_Number LIKE ? OR email LIKE ?', ['%'+param+'%','%'+param+'%','%'+param+'%'], (err, rows, fields) => {
                response.errorMsg = `1,No Data Found for ${param}`;
                if(!err)
                    if(rows.length == 0)
                        callback(response);
                    else
                        callback(rows);
                else
                    callback(err);
            // console.log(err);
            });
        }catch(error){
            console.log(error);
        }
    },
    deleteWorker: function (id, callback){
        console.log("====================== Inside Delete Worker ==================");
        console.log("Id: " +id); 
        connect.query('UPDATE amb_worker_table SET deleted=1 WHERE id = ?', [id], (err, result) => {
            if(!err)
                callback(result)
            else
                callback(err)
        });
    },
    addWorker: function (param, callback){
        console.log("====================== Inside Add Worker ==================");
        console.log(param);
        let fullName = `${param.surname} ${param.middle_name} ${param.surname}`;
    
        checkPhone(param.phone, function(data){ 
            if (!data){
            response.errorMsg = `1,Worker with ${param.phone} already exist!`;
            callback(response);
        }else {
            checkEmail(param.email, function(data){
                 if(!data) {
                response.errorMsg = `1,Worker with ${param.email} already exist!`;
                callback(response);
            }else{
                checkFullname(fullName, function(data){
                    if(!data){
                        response.errorMsg = `1,${fullName} already exist!`;
                        callback(response);
                    }else{    
                        connect.query('INSERT INTO amb_worker_table (Full_Name, Phone_Number, gender, email, Home_Address, Occupation, Department, martial_status, dob) values(?,?,?,?,?,?,?,?,?)',[fullName, param.phone, param.gender, param.email, param.address, param.occupation, param.dept, param.martial_status, param.dob], (err, result) => {
                            if(!err)
                               if(result){
                                    response.successMsg = `0,Worker was successfully added`;
                                    callback(response);
                               }else{
                                    response.errorMsg = `1,Worker was not added successfully`;
                                    callback(response);
                               }
                                // console.log(result);
                            else
                                callback(err);
                                console.log("err" +err);
                        });
                    };
                });
            }});
        }
    });
    },
    editWorker: function (body, callback){
        console.log("====================== Inside edit Worker ==================");
        console.log(body);
        let fullName = `${body.surname} ${body.surname}`
        connect.query('UPDATE amb_worker_table SET Phone_Number = ?, email = ?, Full_Name = ?, Home_Address = ?, dob = ?, gender = ?, Occupation = ?, Department = ?, modified = ?, martial_status = ? WHERE id =?', [body.phone, body.email, fullName, body.address, body.dob, body.gender, body.dept, body.occupation, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), body.martial_status, body.id], (err, result) => {
            if(!err){
                callback(result);
                console.log(result);
            }else
                callback(err);
        });
    },
    countWorker: function(callback){
        console.log("====================== Inside count Worker ==================");
        connect.query('SELECT * FROM amb_worker_table where deleted = 0', (err,rows,fields) => {
            if(!err){
                callback(rows.length);
                console.log("Total Worker: "+rows.length);
            }else
                callback(err);
        })
    },
    getWorkersId: function(phone, id, callback){
        console.log("====================== Inside get Worker id ==================");
        // console.log("")
        connect.query('SELECT id AS _id, Full_Name, Phone_Number, Home_Address, email, dob, martial_status, gender FROM amb_worker_table WHERE Phone_Number = ? and id = ?',[phone, id], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        })
    },
    getWorkerAttendanceER: function(id, callback){
        console.log("====================== Inside get Worker attendance for ER ==================");

        connect.query("SELECT * FROM workers_attendances WHERE members_id = ? and marked = ? and attendance = ? LIMIT 1",[id,'1','Early rain'], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    },
    getWorkerAttendanceLR: function(id, callback){
        console.log("====================== Inside get Worker attendances for LR==================");

        connect.query("SELECT * FROM workers_attendances WHERE members_id = ? and marked = ? and attendance = ? LIMIT 1",[id,'1','Latter rain'], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    },
    getWorkerAttendanceBS: function(id, callback){
        console.log("====================== Inside get Worker attendances for BS ==================");

        connect.query("SELECT members_id, COUNT(members_id) AS bs, marked  FROM workers_attendances WHERE members_id = ? and marked = ? and attendance IN (?,?) LIMIT 2",[id,'1','Early rain','Latter rain'], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    }

}
