const express = require('express');
const response = require('../models/commonResponse');
const memberController = require('../Controller/memberController');
const userController = require('../Controller/userController');
const membersRouter = express.Router();

//============================================= Members Routers ========================================
membersRouter.get('/', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    memberController.getMembers( function (data) {
        res.status(200).json({'data': data});
    })
});
membersRouter.post('/', function(req, res){
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
        response.successMsg = `0,Member was successfully added`;
        memberController.addMember( req.body, function(data) {
            res.status(200).json(data);
            console.log(data);
        });
});

membersRouter.get('/:id', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

        memberController.getMembersById( req.params.id, function (data){
                res.status(200).json({'data': data});
        });
});

membersRouter.get('/search/:param', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    if(!req.params.param == '' || !req.params.param == null || req.params.param == 'search'){
        response.errorMsg = `1,No Data Found for ${req.params.param}`;
        memberController.searchMember( req.params.param, function (data) {
            if(!data.length == 0)
                res.status(200).json({'data':data});
            else 
                res.status(200).json(response);
        });
    }else{
        response.errorMsg = `1,No Parameter was inputed`;
        res.status(404).json(response);
    }
});

membersRouter.put('/', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    memberController.editMember(req.body, (data)=> {
        response.successMsg = `0,Member with id ${req.body.id} updated successfully`;
        if(data){
            res.status(200).json(response);
        }else{
            response.errorMsg = `1,Failed to update member with id ${req.body.id}`;
            res.status(200).json(response);
        }
    })
});

membersRouter.delete('/:id', function(req, res) {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    memberController.deleteMember(req.params.id, function(data){
        if(data){
            response.successMsg = `0,Member with id ${req.params.id} was deleted`;
            res.status(200).json(response);
        }else{
            response.errorMsg = `1,Member with id ${req.params.id} could not be deleted`;
            res.status(200).json(response);
        }
    });
});
membersRouter.get('/checkPhone/:phone/:id', (req, res) => {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.errorMsg = `1,No Data Found for ${req.params.phone}`;
    memberController.getMembersId(req.params.phone, req.params.id, (data) => {
        if(data.length != 0 ){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    })
});
membersRouter.get('/ER/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    memberController.getMemberAttendanceER(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});
membersRouter.get('/LR/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    memberController.getMemberAttendanceLR(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});
membersRouter.get('/BS/:id', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    response.errorMsg= `1,No Data Found For ${req.params.id}`;
    memberController.getMemberAttendanceBS(req.params.id, (data)=> {
        if(data.length != 0){
            res.status(200).json({'data': data});
        }else{
            res.status(200).json(response);
        }
    });
});

module.exports = membersRouter;

//============================================ Members Router Ends==========================
