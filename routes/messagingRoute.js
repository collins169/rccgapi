const express = require('express');
const response = require('../models/commonResponse');
const dashboardResponse = require('../models/dashboardResponse');
const messagingController = require('../Controller/messagingController');
const userController = require('../Controller/userController');
const messagingRouter = express.Router();

messagingRouter.get('/all', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    messagingController.getSentSMS( data => {
        res.status(200).json({'data': data});
    })
});

messagingRouter.post('/allbydate', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    messagingController.getSentSMSByDate(req.body, data => {
        res.status(200).json({'data': data});
    })
})

module.exports = messagingRouter;
