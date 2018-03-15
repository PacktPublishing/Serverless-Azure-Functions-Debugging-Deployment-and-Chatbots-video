module.exports = function (context, req) {
    if (req.query.number) {
        let sq = req.query.number * req.query.number;
        console.log('Number input : ', req.query.number);
        context.res = {
            body: {
                square :sq,
                number : req.query.number
            }
        };
    }
    else {
        context.res = {
            body: "Please pass a number on the query string or in the request body"
        };
    }
    context.done();
};