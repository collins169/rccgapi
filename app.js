const express = require('express');
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');
const app = express();
const membersRouter = require('./routes/memberRoute');
const workerRouter = require('./routes/workerRoute');
const attendanceRouter = require('./routes/attendanceRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const userRouter = require('./routes/userRoute');
const messagingRouter = require('./routes/messagingRoute');

    app.use(express.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        next();
      });
    app.use('/workers', workerRouter);
    app.use('/members', membersRouter);
    app.use('/dashboard', dashboardRouter);
    app.use('/attendance', attendanceRouter);
    app.use('/user', userRouter);
    app.use('/messaging', messagingRouter);


let port = prop.get('server.port');
app.listen(port, () => console.log(`Listening On Port ${port}...`));