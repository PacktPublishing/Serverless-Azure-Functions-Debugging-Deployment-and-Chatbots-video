let fs = require('fs');

module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    var l = context.log; 

    l('Warm up started');

    let dirToScan= __dirname+'\\..';
    let currentDirectory = __dirname.split('\\').pop();
    fs.readdir(dirToScan, function(err,files){
        if(!err){
            files = files.filter(e=>e!=currentDirectory);
            let c = 0;
            for(let entry of files){
                fs.exists(dirToScan+'\\'+entry+'\\function.json', function(existance){
                    if(existance){
                        let func = require(dirToScan+'\\'+entry+'\\index.js');
                        l('Warming up: ',entry);
                        func({ warmpth : true });
                    }
                    c++;
                    if(c >= files.length){
                        l('Warm up Completed.');                        
                        context.done();
                    }
                })
            }
        }else{
            context.done();
        }
    });
};