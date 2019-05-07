const express = require('express');
const response = require('../models/commonResponse');
const attendanceController = require('../Controller/attendanceController');
const userController = require('../Controller/userController');
const attendanceRouter = express.Router();

attendanceRouter.post('/member_ER/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.memberEarlyRain(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/member_LR/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.memberLatterRain(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/member_BS/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.memberBothService(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/worker_ER/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.workerEarlyRain(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/worker_LR/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.workerLatterRain(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/worker_BS/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.successMsg=`0,SUCCESS`;
    attendanceController.workerBothService(req.body.id, (data)=> {
        if(data) {
            res.status(200).json(response);
        }else{
            response.errorMsg=`1,FAILED`;
            res.status(200).json(response);
        }
    });
});
attendanceRouter.post('/', (req, res)=> {
    attendanceController.getAttendanceRecord(req.body, (data)=> {
        res.status(200).json({'data': data});
    });
});

module.exports = attendanceRouter;