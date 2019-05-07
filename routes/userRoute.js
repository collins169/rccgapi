const express = require('express');
const response = require('../models/commonResponse');
const userController = require('../Controller/userController');
const userRouter = express.Router();

userRouter.post('/login', (req, res) => {
    console.log(req.body);
    userController.loginUser(req.body, (data) => {
        res.status(200).json(data);
    });
});

userRouter.get('/verify', (req, res) => {
    console.log(req.headers['authorization']);
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    })
});

module.exports = userRouter;