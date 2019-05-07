const connect= require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');

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
        })
    }
}