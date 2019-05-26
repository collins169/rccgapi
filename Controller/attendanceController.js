const connect = require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');

module.exports = {
    memberEarlyRain: function(id, callback){
        console.log("===== Inside Member EaryRain ======");
        console.log("id: " + id);
        connect.query('SELECT * FROM attendances WHERE marked= ? and attendance=? and attendance_date = ? and members_id = ?', ['1','Early rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(!err) {
                if(result.length == 0) {
                   connect.query('INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{                           
                        if(!err){
                            callback(result);
                        }else{
                            callback(err);
                        }
                    }); 
                } else {
                    callback(false);
                }
            }
        });
            
    },
    memberLatterRain: function(id, callback){
        console.log("===== Inside Member LatterRain ======");
        console.log("id: " + id);
        connect.query('SELECT * FROM attendances WHERE marked= ? and attendance=? and attendance_date = ? and members_id = ?', ['1','Latter rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(!err) {
                if(result.length == 0) {
                   connect.query('INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{                           
                        if(!err){
                            callback(result);
                        }else{
                            callback(err);
                        }
                    }); 
                } else {
                    callback(false);
                }
            }
        });
        // connect.query('INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
        //     if(!err){
        //         callback(result);
        //         // console.log(result);
        //     }else{
        //         callback(err);
        //     }
        // });
    },
    memberBothService: function(id, callback){
        console.log("===== Inside Member Both Service ======");
        console.log("id: " + id);
        connect.query('SELECT * FROM attendances WHERE marked= ? and attendance in (?) and attendance_date = ? and members_id = ?', ['1','Early rain, Latter rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(result.length != 2) {
                var sql = "INSERT INTO attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES ?";
                var values = [
                    [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')],
                    [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')]
                ]
                connect.query(sql, [values], (err, result) =>{
                        if(!err){
                            callback(result);
                            // console.log(result);
                        }else{
                            callback(err);
                        }
                });
            }else {
                callback(false);
            }
        });
    },
    workerEarlyRain: function(id, callback){
        console.log("===== Inside Worker EaryRain ======");
        console.log("id: " + id);
        // connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{                           
        //     if(!err){
        //         callback(result);
        //     }else{
        //         callback(err);
        //     }
        // });
        connect.query('SELECT * FROM workers_attendances WHERE marked= ? and attendance=? and attendance_date = ? and members_id = ?', ['1','Early rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(!err) {
                if(result.length == 0) {
                   connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{                           
                        if(!err){
                            callback(result);
                        }else{
                            callback(err);
                        }
                    }); 
                } else {
                    callback(false);
                }
            }
        });
    },
    workerLatterRain: function(id, callback){
        console.log("===== Inside worker LatterRain ======");
        console.log("id: " + id);
        // connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{
        //     if(!err){
        //         callback(result);
        //         // console.log(result);
        //     }else{
        //         callback(err);
        //     }
        // });
        connect.query('SELECT * FROM workers_attendances WHERE marked= ? and attendance=? and attendance_date = ? and members_id = ?', ['1','Latter rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(!err) {
                if(result.length == 0) {
                   connect.query('INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES(? ,? , ? ,? ,? ,? ,?)', [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')], (err, result) =>{                           
                        if(!err){
                            callback(result);
                        }else{
                            callback(err);
                        }
                    }); 
                } else {
                    callback(false);
                }
            }
        });
    },
    workerBothService: function(id, callback){
        console.log("===== Inside Worker both service ======");
        console.log("id: " + id);
        //     var sql = "INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES ?";
        //         var values = [
        //             [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')],
        //             [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')]
        //         ]
        //         connect.query(sql, [values], (err, result) =>{
        //         if(!err){
        //             callback(result);
        //             // console.log(result);
        //         }else{
        //             callback(err);
        //         }
        // });
        connect.query('SELECT * FROM workers_attendances WHERE marked= ? and attendance in (?) and attendance_date = ? and members_id = ?', ['1','Early rain, Latter rain',moment(Date.now()).format('YYYY-MM-DD'), id], (err, result) => {
            if(result.length != 2) {
                var sql = "INSERT INTO workers_attendances (members_id,status,attendance,marked,attendance_date,created,modified) VALUES ?";
                var values = [
                    [id, 'present', 'Early rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')],
                    [id, 'present', 'Latter rain', '1',moment(Date.now()).format('YYYY-MM-DD'), moment(Date.now()).add(2, 'days').format('YYYY-MM-DD HH:mm:ss'), moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')]
                ]
                connect.query(sql, [values], (err, result) =>{
                        if(!err){
                            callback(result);
                            // console.log(result);
                        }else{
                            callback(err);
                        }
                });
            }else {
                callback(false);
            }
        });
    },
    getAttendanceRecord: function(param, callback) {
        console.log("==== Inside Get Attendance Record ====");
        console.log(moment(param.s_date).format('YYYY-MM-DD'));
        console.log(param);
        if(param.option === 'M') {
            console.log("================ members ==================");
            var sql = "SELECT members.id, CONCAT(members.surname, ' ', members.first_name) AS Full_Name, members.phone AS Phone_Number, members.email AS email FROM members WHERE members.deleted=0 AND members.id  NOT IN (SELECT attendances.members_id FROM attendances WHERE STATUS='present' AND attendance=? AND attendance_date=?)";
            connect.query(sql, [param.service, moment(param.s_date).format('YYYY-MM-DD')], (err, result) => {
                // console.log(result);
                if(!err) {
                    callback(result);
                }else {
                    callback(err);
                }
            });
        }else {
            console.log("================ Worker ==================");
            var sql2 = "SELECT amb_worker_table.id,  amb_worker_table.Full_Name, amb_worker_table.Phone_Number, amb_worker_table.email FROM amb_worker_table WHERE amb_worker_table.deleted=0 AND amb_worker_table.id  NOT IN(SELECT workers_attendances.members_id FROM workers_attendances WHERE STATUS='present' AND attendance=? AND attendance_date=?)";
            connect.query(sql2, [param.service, moment(param.s_date).format('YYYY-MM-DD')], (err, result) => {
                // console.log(result);
                if(!err) {
                    callback(result);
                }else {
                    callback(err);
                }
            });
        }
    }
}