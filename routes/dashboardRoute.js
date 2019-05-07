const express = require('express');
const response = require('../models/commonResponse');
const dashboardResponse = require('../models/dashboardResponse');
const dashboardController = require('../Controller/dashboardController');
const workerController = require('../Controller/workerController');
const memberController = require('../Controller/memberController');
const userController = require('../Controller/userController');
const dashboardRouter = express.Router();


dashboardRouter.get('/totalMembers', function(req, res){
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

    memberController.countMember( (data) => {
        dashboardResponse.totalMembers = data;
         res.status(200).json(dashboardResponse);
    });
 });
 dashboardRouter.get('/totalWorkers', function(req, res){
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });

     workerController.countWorker( (data) => {
         dashboardResponse.totalWorkers = data;
          res.status(200).json(dashboardResponse);
     });
  });

 dashboardRouter.post('/ER/', (req, res)=> {
    var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
     // console.log(req.body);
     response.successMsg=`0,SUCCESS`;
     dashboardController.earlyRain(req.body.phone, req.body.id, (data)=> {
         if(data){
            res.status(200).json(response); 
         }else{
             response.errorMsg=`1,FAILED`;
             res.status(200).json(response);
         }
         
         // console.log(data);
     });
 });

 dashboardRouter.post('/LR/', (req, res)=> {
     // console.log(req.body);
     var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
     response.successMsg=`0,SUCCESS`;
     dashboardController.latterRain(req.body.phone, req.body.id, (data)=> {
         if(data){
            res.status(200).json(response); 
         }else{
             response.errorMsg=`1,FAILED`;
             res.status(200).json(response);
         }
         
         // console.log(data);
     });
 });
 dashboardRouter.post('/BS/', (req, res)=> {
     // console.log(req.body);
     var token = req.headers['authorization'];
    if (!token)
    return res.status(403).send({ respCode: 99, respMsg: 'No token provided.' });
    
    userController.decrpytToken(token, (data) => {
        if(!data) {
           return res.status(403).json({ respCode: false, respMsg: 'Failed to authenticate token.' });
        }
    });
     response.successMsg=`0,SUCCESS`;
     dashboardController.bothService(req.body.phone, req.body.id, (data)=> {
         if(data){
            res.status(200).json(response); 
         }else{
             response.errorMsg=`1,FAILED`;
             res.status(200).json(response);
         }
         
         // console.log(data);
     });
 });

 module.exports = dashboardRouter;