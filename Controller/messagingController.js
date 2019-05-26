const connect= require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');
const request = require('request');

module.exports = {
    getSentSMS: function(callback) {
        
        connect.query('SELECT * FROM sms_log ORDER BY TIMESTAMP ASC', (err, result) => {
            if(!err) {
                callback(result);
            }
        });
    },
    getSentSMSByDate: function(body, callback) {
        connect.query('SELECT * FROM sms_log WHERE DATE(TIMESTAMP) BETWEEN ? AND ?', [body.start_date, body.end_date], (err, result) => {
            if(!err) {
                callback(result);
            }
        });
    },
    sendSMS: function(phone, text, callback) {
        var requestData = {
                  'phone': phone,
                  'message': text
                };
        request({
            url: 'http://localhost/rccg/messaging/send_sms.php',
            method: 'POST',
            headers:{
            "content-type": "application/json"
            },
            json: true,
            body:requestData
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
            callback(body);
            // console.log(JSON.parse(body));
            }else{
                callback(error);
            }
        });
    }
}