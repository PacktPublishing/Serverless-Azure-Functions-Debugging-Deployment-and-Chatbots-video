var log = () => { };
var request = require("request");

const conf = {
    PAGE_AT: '',
    PAGE_ID: '',
}
module.exports = function (context, req) {
    log = context.log;
    const respond = (obj) => { context.res = { status: 200, body: obj }; context.done(); };

    let body = req.body;
    if (!body) {
        respond({ ok: true });
        return;
    }
    handle(body, function (sender, msg) {
        log('[LOG] We have a message from  ', sender, ': ');
        if (msg.text) {
            // this is a text message
            log('[TEXT] ', msg.text);
            if (utter(msg.text, ['hi', 'hello', 'hey'])) {
                textMsg(sender, "Hello Buddy");
            }
        }
    });
    respond({ ok: true });
};

function handle(body, cb) {
    if (body.object == 'page' && body.entry.length) {
        for (let e of body.entry) {
            if (e.hasOwnProperty('messaging') && e.messaging.length) {
                for (let em of e.messaging) {
                    if (em.sender && em.message) {
                        cb(em.sender.id, em.message);
                    }
                }
            }
        }
    }
}

function send(body, cb) {
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${conf.PAGE_AT}`
    var options = {
        method: 'POST',
        url,
        headers: { 'Content-Type': 'application/json' },
        body,
        json: true
    };
    request(options, function (error, response, responseBody) {
        if (error) throw new Error(error);
        cb(responseBody);
    });

}

function utter(word, toMatch) {
    let w = word.toLowerCase();
    for (let item of toMatch) {
        if (item.toLowerCase().indexOf(w) > -1) {
            return true;
        }
    }
    return false;
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
