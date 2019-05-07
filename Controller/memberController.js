const connect= require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');

function checkPhone(phone, callback){
    console.log("====================== Inside check Phone ==================");
    console.log("Phone: "+phone);
    connect.query('SELECT * FROM members WHERE phone = ?', [phone], (err, rows, fields) => {
        // console.log(rows);
        if(!err)
            if(rows.length == 0)
                callback(true);
            else
                callback(false);
        else
            callback(err);
    });
}
function checkEmail(email, callback){
    console.log("====================== Inside check Email ==================");
    console.log("Email: "+email);
    connect.query('SELECT * FROM members WHERE email = ?', [email], (err, rows, fields) => {
        // console.log(rows);
        if(!err)
            if(rows.length == 0)
                callback(true);
            else
                callback(false);
        else
            callback(err);
    });
}
function checkFullname(first_name, surname, callback){
    console.log("====================== Inside check Fullname ==================");
    console.log("name: "+surname+ " " +first_name);
    connect.query('SELECT * FROM members WHERE first_name = ? AND surname = ?',[first_name, surname], (err, rows, fields) => {
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
    getMembers: function(callback){
        console.log("====================== Inside get all Members ==================");
        try{
            connect.query('SELECT * FROM members WHERE deleted = 0',(err,rows, fields) => {
                response.errorMsg = `1,No data found`;
                if(!err)
                    if(!rows.length == 0)
                        callback(rows);
                    else 
                        callback(response);
                else
                    callback(err);
            console.log(err);
            });
        }catch (error){
            console.log(error);
        }
    },

    getMembersById: function(id, callback){
        console.log("====================== Inside get Members by Id ==================");
        try{
            connect.query('SELECT * FROM members WHERE id = ?',[id],(err, rows, fields)=> {
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
    searchMember: function(param, callback){
        console.log("====================== Inside search Worker ==================");
        console.log("param: "+param);
        try{
            connect.query("SELECT id AS _id,CONCAT(surname,' ',middle_name, ' ',first_name) AS Full_Name, phone AS Phone_Number, address AS Home_Address, email, dob, martial_status, gender FROM members WHERE surname LIKE ? OR first_name LIKE ? OR phone LIKE ? AND deleted = 0", ['%'+param+'%','%'+param+'%','%'+param+'%'], (err, rows, fields) => {
                response.errorMsg = `1,No Data Found for ${param}`;
                if(!err)
                    if(rows.length == 0)
                        callback(response);
                    else
                        callback(rows);
                else
                    callback(err);
            });
        }catch(error){
            console.log(error);
        }
    },
    addMember: function (param, callback){
        console.log("====================== Inside Add Member ==================");
        console.log(param);
        checkPhone(param.phone, function(data){ if(!data) {
             response.errorMsg = `1,Member with ${param.phone} already exist!`;
            callback(response);
        }else {
            checkEmail(param.email, function(data){ if(!data){
                response.errorMsg = `1,Member with ${param.email} already exist!`;
                callback(response);
            }else {
                checkFullname(param.first_name, param.surname, function(data){
                    if(!data){
                        response.errorMsg = `1, ${param.first_name} ${param.surname} already exist!`;
                        callback(response);
                    }else{    
                        connect.query('INSERT INTO members (surname, middle_name, first_name, phone, gender, email, address, occupation, martial_status, dob) values(?,?,?,?,?,?,?,?,?,?)',[param.surname, param.middle_name, param.first_name, param.phone, param.gender, param.email, param.address, param.occupation, param.martial_status, param.dob], (err, result) => {
                            if(!err)
                                    if(result){
                                        response.successMsg = `0,Member was successfully added`;
                                        callback(response);
                                }else{
                                        response.errorMsg = `1,Member was not added successfully`;
                                        callback(response);
                                }
                            else
                                callback(err);
                                console.log(err);
                        });
                    };
                })
            }
        })
        }
    })
           
    },
    deleteMember: function (id, callback){
        console.log("====================== Inside delete Member ==================");
        console.log("id: "+id);
        connect.query('UPDATE members SET deleted=1 WHERE id = ?', [id], (err, result) => {
            if(!err)
                callback(result)
            else
                callback(err)
        });
    },
    editMember: function (body, callback){
        console.log("====================== Inside edit Member ==================");
        console.log(body);
        connect.query('UPDATE members SET phone = ?, email = ?, first_name = ?, surname = ?, address = ?, dob = ?, gender = ?, occupation = ?, modified = ? WHERE id =?', [body.phone, body.email, body.first_name, body.surname, body.address, body.dob, body.gender, body.occupation, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), body.id], (err, result) => {
            if(!err){
                callback(result);
                console.log(result);
            }else
                callback(err);
        });
    },
    countMember: function(callback){
        console.log("====================== Inside count Member ==================");
        connect.query('SELECT * FROM members where deleted = 0', (err,rows,fields) => {
            if(!err){
                callback(rows.length);
                console.log("Total Members: "+rows.length);
            }else
                callback(err);
        })
    },
    getMembersId: function(phone, id, callback){
        console.log("====================== Inside get Member id ==================");
        connect.query("SELECT id AS _id,CONCAT(surname,' ',middle_name, ' ',first_name) AS Full_Name, phone AS Phone_Number, address AS Home_Address, email, dob, martial_status, gender FROM members WHERE phone = ? and id = ?", [phone,id], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    },
    getMemberAttendanceER: function(id, callback){
        console.log("====================== Inside get Member attendance for ER==================");
        connect.query("SELECT * FROM attendances WHERE members_id = ? and marked = ? and attendance = ? LIMIT 1",[id,'1','Early rain'], (err, rows, fields) => {
            console.log(rows);
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    },
    getMemberAttendanceLR: function(id, callback){
        console.log("====================== Inside get Member attendance for LR==================");
        connect.query("SELECT * FROM attendances WHERE members_id = ? and marked = ? and attendance = ? LIMIT 1",[id,'1','Latter rain'], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    },
    getMemberAttendanceBS: function(id, callback){
        console.log("====================== Inside get Member attendance for BS==================");
        connect.query("SELECT members_id, COUNT(members_id) AS bs, marked FROM attendances WHERE members_id = ? and marked = ? and attendance in (?,?) LIMIT 2",[id,'1','Early rain','Latter rain'], (err, rows, fields) => {
            if(!err){
                callback(rows);
            }else{
                callback(err);
            }
        });
    }

}
