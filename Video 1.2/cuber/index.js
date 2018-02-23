module.exports = function (context, req) {
    let n = req.query.number || 1;
    context.res = {
            body: {
                msg:'You have the cube',
                cube : n*n*n
            }
        };
    context.done();
};

