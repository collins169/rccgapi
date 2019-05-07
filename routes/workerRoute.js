const express = require('express');
const response = require('../models/commonResponse');
const workerController = require('../Controller/workerController');
const userController = require('../Controller/userController');
const workerRouter = express.Router();

//========================================= Workers Router ==================================
workerRouter.get('/', (req, res) =>{
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    })
    workerController.getWorkers( (data) => {
        res.status(200).json({'data':data});
    });
});

workerRouter.get('/:id', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    })
    workerController.getWorkersById(req.params.id, (data) => {
        res.status(200).json({'data': data});
    });
});
workerRouter.post('/', function(req, res){
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    })
    response.successMsg = `0,Worker was successfully added`;
    workerController.addWorker( req.body, function(data) {
        console.log(data);
        res.status(200).json(data);
    });
});

workerRouter.get('/search/:param', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    })
    workerController.searchWoker(req.params.param, (data) => {
        res.status(200).json({'data': data});
    });
});

workerRouter.put('/', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    workerController.editWorker(req.body, (data)=> {
        response.successMsg = `0,Worker with id ${req.body.id} updated successfully`;
        if(data){
            res.status(200).json(response);
        }else{
            response.errorMsg = `1,Failed to update member with id ${req.body.id}`;
            res.status(200).json(response);
        }
    })
});

workerRouter.delete('/:id', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    workerController.deleteWorker(req.params.id, function(data){
        if(data){
            response.successMsg = `0,Worker with id ${req.params.id} was deleted`;
            res.status(200).json(response);
        }else{
            response.errorMsg = `1,Worker with id ${req.params.id} could not be deleted`;
            res.status(200).json(response);
        }
    });
});

workerRouter.get('/checkPhone/:phone/:id', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    response.errorMsg = `1,No Data Found for ${req.params.phone}`;
    workerController.getWorkersId(req.params.phone, req.params.id, (data) => {
        if(data.length != 0 ){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    })
});

workerRouter.get('/ER/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    workerController.getWorkerAttendanceER(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});
workerRouter.get('/LR/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    workerController.getWorkerAttendanceLR(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});
workerRouter.get('/BS/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    workerController.getWorkerAttendanceBS(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});

module.exports = workerRouter;
//=============================== Worker Router Ends Here =======================================