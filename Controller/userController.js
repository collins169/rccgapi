const connect = require('../Configuration/DBConfiguration');
const response = require('../models/commonResponse');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');
const md5 = require('md5');

function decrpytToken (token, callback) {
    jwt.verify(token, config.secret, function(err, decoded) {
        if (!err){
            callback(decoded);
        }else{
            callback('Failed');
        }
      });
}

function checkUser (username, callback) {
    console.log("======================================inside Check User ==============================")
    connect.query('SELECT * FROM users WHERE username = ?', [username], (err, result) =>{
        if(!err) {
            // console.log(result);
            if(result.length !== 0 ) {
                callback(true);
            }else {
                callback(false);
            }
        }else {
            callback(false);
        }
    })
}

module.exports = {
    loginUser: function(body, callback) {
        console.log(" ========================= inside Login function ===========================");
        console.log(body);
        connect.query('SELECT * from users where username = ? and password = ?', [body.username, md5(body.password)], (err, result) =>{
            if(!err) {
                // console.log(result);
                let respCode = 0;
                let respMsg = '';
                let token = ''
                    if(result.length !== 0) {
                        respCode = 00;
                        respMsg = 'SUCCESS';
                        token = jwt.sign({ username: body.username }, prop.get('jwt.secret'), {
                            expiresIn: prop.get('jwt.expire') // expires in 24 hours
                          });
                    }else {
                        respCode = 99;
                        respMsg = 'FAILED';
                        token = '';
                    }
                    const response = {
                        'userDetails': result[0],
                        'token': token,
                        'respMsg': respMsg,
                        'respCode': respCode,
                    }
                    callback(response);
            }else {
                callback(err);
            }
        });
    },
    decrpytToken: function (token, callback) {
        console.log("=============================== decrpty token ==============================")
        jwt.verify(token, prop.get('jwt.secret'), function(err, decoded) {
            if (!err){
                // checkUser(decoded.username, data => {
                //     callback(data);
                // });
                callback(true);
            }else{
                callback(false);
            }
          });
    }
}