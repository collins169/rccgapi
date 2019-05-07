const request = require('request');
const xmlParser = require('xml2json');
const cron = require('cron');
var cronJob = cron.job("*/5 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    request('https://portal.wirepick.com/httpsms/send?client=RCCGAMBGHANA&password=amb@wirepick&phone=233274421165&text=testing%20credentials&from=RCCGAMBGH', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(xmlParser.toJson(body));
      }
    });
}); 
cronJob.start();
