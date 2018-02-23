module.exports = function (context, req) {
    if(context.warmpth){return 1;}
    
    let n = req.query.number || 1;
    context.log("Number input : ",n);
    context.res = {
            body: {
                msg:'You have the cube',
                cube : n*n*n
            }
        };
    context.done();
};