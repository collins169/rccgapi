const connect= require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');

module.exports = {
    getMembers: function(callback){
        try{
            connect.query('SELECT * FROM members',(err,rows, fields) => {
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
        try{
            connect.query('SELECT * FROM members WHERE surname LIKE ? OR first_name LIKE ? OR phone LIKE ?', ['%'+param+'%','%'+param+'%','%'+param+'%'], (err, rows, fields) => {
                response.errorMsg = `1,No Data Found for ${param}`;
                if(!err)
                    if(rows.length == 0)
                        callback(rows);
                    else
                        callback(response);
                else
                    callback(err);
            console.log(err);
            });
        }catch(error){
            console.log(error);
        }
    },
    addMember: function (param, callback){
        console.log(param);
        connect.query('INSERT INTO members (surname, middle_name, first_name, phone, gender, email, address, occupation, martial_status, dob) values(?,?,?,?,?,?,?,?,?,?)',[param.surname, param.middle_name, param.first_name, param.phone, param.gender, param.email, param.address, param.occupation, param.martial_status, param.dob], (err, result) => {
            if(!err)
                callback(result);
                // console.log(result);
            else
                callback(err);
                console.log(err);
        });
    },
    checkPhone: function (phone, callback){
        // console.log(phone);
        connect.query('SELECT * FROM members WHERE phone = ?', ['%'+phone+'%'], (err, rows, fields) => {
            if(!err)
                callback(rows);
            else
                callback(err);
        });
    },
    checkEmail: function (email, callback){
        // console.log(email);
        connect.query('SELECT * FROM members WHERE email = ?', ['%'+email+'%'], (err, rows, fields) => {
            // console.log(rows);
            if(!err)
                callback(rows);
            else
                callback(err);
        });
    },
    checkFullname: function (first_name, surname, callback){
        connect.query('SELECT * FROM members WHERE first_name = ? AND surname = ?',[first_name, surname], (err, rows, fields) => {
            // console.log(rows);
            if(!err)
                if(rows.length == 0)
                    callback(true);
                else
                    callback(false);
            else
                callback(err);
        });
    },
    deleteMember: function (id, callback){
        connect.query('DELETE FROM members WHERE id = ?', [id], (err, result) => {
            if(!err)
                callback(result)
            else
                callback(err)
        });
    },
    editMember: function (body, callback){
        connect.query('UPDATE members SET phone = ?, email = ?, first_name = ?, surname = ?, address = ?, dob = ?, gender = ?, occupation = ?, modified = ? WHERE id =?', [body.phone, body.email, body.first_name, body.surname, body.address, body.dob, body.gender, body.occupation, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), body.id], (err, result) => {
            if(!err)
                callback(result);
            else
                callback(err);
        });
    }

}
