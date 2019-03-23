const express = require('express');
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');
const app = express();
const response = require('./models/commonResponse');
const controller = require('./Controller/memberController');
app.use(express.json());

const membersRouter = express.Router();
const workerRouter = express.Router();
//============================================= Members Routers ========================================
    membersRouter.get('/', function(req, res) {
        controller.getMembers( function (data) {
            res.status(200).json(data);
        })
    });
    membersRouter.post('/', function(req, res){
        // console.log(req.body);
        if(req.body.email == '' || req.body.email == null){
            response.errorMsg = '1,Email Cannot be empty';
            res.status(200).json(response);
        }else if(req.body.phone == '' || req.body.phone == null){
            response.errorMsg = '1, Phone number Cannot be empty';
            res.status(200).json(response);
        }else if(controller.checkPhone(req.body.phone, function(data){ data.length != 0})){
            response.errorMsg = `1,Member with ${req.body.phone} already exist!`;
            res.status(200).json(response);
        }else if(controller.checkEmail(req.body.email, function(data){data.length != 0})){
            response.errorMsg = `1,Member with ${req.body.email} already exist!`;
            res.status(200).json(response);
        }
        controller.checkFullname(req.body.first_name, req.body.surname, function(data){
            if(!data){
                 response.errorMsg = `1, ${req.body.first_name} ${req.body.surname} already exist!`;
            res.status(200).json(response);
            }else{
                response.successMsg = `0,Member was successfully added`;
                controller.addMember( req.body, function(data) {
                    if(data){
                        res.status(200).json(response);
                    }else{
                        response.errorMsg = `1,Member was not added successfully`;
                        res.status(200).json(response);
                        console.log('failed');
                    }
                });
            }
        });
    });

    membersRouter.get('/:id', function(req, res) {
            controller.getMembersById( req.params.id, function (data){
                    res.status(200).json(data);
            });
    });

    membersRouter.get('/search/:param', function(req, res) {
        if(!req.params.param == '' || !req.params.param == null || req.params.param == 'search'){
            response.errorMsg = `1,No Data Found for ${req.params.param}`;
            controller.searchMember( req.params.param, function (data) {
                if(!data.length == 0)
                    res.status(200).json(data);
                else 
                    res.status(404).json(response);
            });
        }else{
            response.errorMsg = `1,No Parameter was inputed`;
            res.status(404).json(response);
        }
    });

    membersRouter.put('/', function(req, res) {
        controller.editMember(req.body, (data)=> {
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
        controller.deleteMember(req.params.id, function(data){
            if(data){
                response.successMsg = `0,Member with id ${req.params.id} was deleted`;
                res.status(200).json(response);
            }else{
                response.errorMsg = `1,Member with id ${req.params.id} could not be deleted`;
                res.status(200).json(response);
            }
        });
    });
//============================================ Members Router Ends==========================

    app.use('/workers', workerRouter);
    app.use('/members', membersRouter);


let port = prop.get('server.port');
app.listen(port, () => console.log(`Listening On Port ${port}...`));