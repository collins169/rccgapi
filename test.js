const request = require('request');
const xmlParser = require('xml2json');
var CronJob = require('cron').CronJob;
const connect = require('./Configuration/DBConfiguration');
const messagingController = require("./Controller/messagingController");
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('config.properties');

console.log("================== Service Started ===================");
console.log("Scheduled Time for Present SMS : " +prop.get('cron.present'));
console.log("Scheduled Time for Absent SMS : " +prop.get('cron.absent'));

//Crob Job for Present Member
const present_member_job = new CronJob(prop.get('cron.present'), function(){
  var sql = "SELECT members.phone as phone FROM members WHERE members.deleted=0 AND members.id  IN(SELECT attendances.members_id FROM attendances WHERE STATUS='present' AND marked = 1)";
  var sms = "Dear Bro/Sis, We are glad you made it to church. We believe you felt God's love in a refreshing way and we believe you'll come again. Have a wonderful week and God bless you. Pastor Lanre Jooda";
  connect.query(sql, (err, rows, field)=>{
    if(!err){
      for (var i = 0; i < rows.length; i++) {
        var phone = rows[i].phone; 
          messagingController.sendSMS(phone, sms, (data) => {
            console.log(data);
          });
          console.log(phone);
      }
    }else{
      console.log(err);
    }
  });
}); 

//Crob Job for Worker Member
const present_worker_job = new CronJob(prop.get('cron.present'), function(){
  var sql2 = "SELECT amb_worker_table.Phone_Number as phone FROM amb_worker_table WHERE amb_worker_table.deleted=0 AND amb_worker_table.id IN(SELECT workers_attendances.members_id FROM workers_attendances WHERE STATUS='present' AND marked = 1)";
  var sms2 ="Dear Bro/Sis, We are glad you made it to church. We believe you felt God's love in a refreshing way and we believe you'll come again. Have a wonderful week and God bless you. Pastor Lanre Jooda";
  connect.query(sql2, (err, rows, field)=>{
    if(!err){
      for (var i = 0; i < rows.length; i++) {
        var phone = rows[i].phone; 
          messagingController.sendSMS(phone, sms2, (data) => {
            console.log(data);
          });
          console.log(phone);
      }
    }else{
      console.log(err);
    }
  });
}); 

//Crob Job for Absent Member
const absent_member_job = new CronJob(prop.get('cron.absent'), function(){
  var sql3 = "SELECT members.phone as phone FROM members WHERE members.deleted=0 AND members.id  NOT IN(SELECT attendances.members_id FROM attendances WHERE STATUS='present' AND marked = 1)";
  var sms3 = "Dear Bro/Sis, We didn't see you in church and believe you are doing well. Your absence was felt on Sunday, Remain in the grace of God and see you next week Sunday by His grace. God bless you Pastor Lanre Jooda";
  connect.query(sql3, (err, rows, field)=>{
    if(!err){
      for (var i = 0; i < rows.length; i++) {
        var phone3 = rows[i].phone; 
          messagingController.sendSMS(phone3, sms3, (data) => {
            console.log(data);
          });
          console.log(phone);
      }
    }else{
      console.log(err);
    }
  });
}); 

//Crob Job for Absent Member
const absent_worker_job = new CronJob(prop.get('cron.absent'), function(){
  var sql4 = "SELECT amb_worker_table.Phone_Number as phone FROM amb_worker_table WHERE amb_worker_table.deleted=0 AND amb_worker_table.id  NOT IN(SELECT workers_attendances.members_id FROM workers_attendances WHERE STATUS='present' AND marked = 1)";
  var sms4 = "Dear Bro/Sis, We didn't see you in church and believe you are doing well. Your absence was felt on Sunday, Remain in the grace of God and see you next week Sunday by His grace. God bless you Pastor Lanre Jooda";
  connect.query(sql4, (err, rows, field)=>{
    if(!err){
      for (var i = 0; i < rows.length; i++) {
        var phone4 = rows[i].phone; 
          messagingController.sendSMS(phone4,sms4, (data) => {
            console.log(data);
          });
          console.log(phone);
      }
    }else{
      console.log(err);
    }
  });
}); 
present_member_job.start();
present_worker_job.start();
absent_member_job.start();
absent_worker_job.start();
// console.log('is job running? ', job.running);
