const request = require("request");
const PAGE_ACCESS_TOKEN = 'EAAJlGF8cRZAEBACjq3eq4E4VXxAadoZBpz2XRZC17ZAvbWIOcsFxP906gidiLzs2AqYpZBV7z9rWgRQs9VL2GQH3gmVRvUevZBgQ8sn1tAbqIiTqCEZA34bB8ZBNzBzK7Jov3LKIGFAi37oKT49Wl5ENOK4aTdb9NoqYbbzNZAydIugZDZD';

module.exports = function (context, messageToSend) {
    context.log('[messageToSend]: ', messageToSend);
    
    switch(messageToSend.type){
        case 1:{
            textMsg(messageToSend.to, messageToSend.text); 
            break;
        }
        case 2:{
            askLocation(messageToSend.to);
            break;            
        }
    }
    
    context.done();
};

function send(body, cb) {
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`
    var options = {
        method: 'POST',
        url,
        headers: { 'Content-Type': 'application/json' },
        body,
        json: true
    };
    request(options, function (error, response, responseBody) {
        if (error){ 
            throw new Error(error);
            }
        if(cb){cb(responseBody);}
    });

}

function textMsg(to, txt) {
    send({
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": to
        },
        "message": {
            "text": txt
        }
    })
}

function askLocation(to) {
    send({
        "messaging_type": "RESPONSE",
        "recipient": {
            "id": to
        },
        "message": {
            "text": "Please send me your current location buddy.",
            "quick_replies": [
                {
                    "content_type": "location",
                },
            ]
        },
    })
}