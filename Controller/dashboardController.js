const connect = require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const workers = require('../Controller/workerController');
const members = require('../Controller/memberController');
const moment = require('moment');

module.exports = {
    earlyRain: function(phone, id, callback){
        members.getMembersId(phone, id, (data) => {
            if(data.length == 0){
                workers.getWorkersId(phone, id, (res) => {
                    if(res.length != 0){
                        console.log('Workers');
                        res.forEach( result => {
                            console.log(result._id);
                            connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [result._id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
                                if(!err){
                                    callback(result);
                                }else{
                                    callback(err);
                                }
                            });
                        });
                    }
                })
            }else {
                data.forEach( ndata => {
                    console.log(ndata._id);
                    connect.query('INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [ndata._id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
                        if(!err){
                            callback(result);
                            // console.log(result);
                        }else{
                            callback(err);
                        }
                    });
                });
            }
        })
    },
    latterRain: function(phone, id, callback){
        members.getMembersId(phone, id, (data) => {
            if(data.length == 0){
                workers.getWorkersId(phone, id, (res) => {
                    if(res.length != 0){
                        console.log('Workers');
                        res.forEach( result => {
                            console.log(result._id);
                            connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [result._id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
                                if(!err){
                                    callback(result);
                                }else{
                                    callback(err);
                                }
                            });
                        });
                    }
                })
            }else {
                data.forEach( ndata => {
                    console.log(ndata._id);
                    connect.query('INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [ndata._id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
                        if(!err){
                            callback(result);
                            // console.log(result);
                        }else{
                            callback(err);
                        }
                    });
                });
            }
        })
    },
    bothService: function(phone, id, callback){
        members.getMembersId(phone, id, (data) => {
            if(data.length == 0){
                workers.getWorkersId(phone, id, (res) => {
                    if(res.length != 0){
                        // console.log('Workers');
                        res.forEach( result => {
                            // console.log(result._id);
                            var sql = "INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES ?";
                            var values = [
                                [result._id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')],
                                [result._id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')]
                            ]
                            connect.query(sql, [values], (err, result) =>{
                                // console.log(result.affectedRows);
                                if(!err){
                                    callback(result);
                                }else{
                                    callback(err);
                                }
                            });
                        });
                    }
                })
            }else {
                data.forEach( ndata => {
                    console.log(ndata._id);
                    var sql = "INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES ?";
                            var values = [
                                [result._id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')],
                                [result._id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')]
                            ]
                            connect.query(sql, [values], (err, result) =>{
                            if(!err){
                                callback(result);
                                // console.log(result);
                            }else{
                                callback(err);
                            }
                    });
                });
            }
        })
    }
}