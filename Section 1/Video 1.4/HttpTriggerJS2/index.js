let warmpth = 0;
module.exports = function (context, req) {
    if(context.warmpth){
        warmpth++;
        return 1;
    }

    context.log('JavaScript HTTP trigger function processed a request.');

    context.res = {
        body:{
            warmpth,
            saying:'hi',
            someNumber: 99*66*76
        }
    };

    context.done();
};