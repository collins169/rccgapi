var exec = require('child_process').exec;

exec("crontab -l", function(err, stdout, stderr) {
    console.log(stdout);
});