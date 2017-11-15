const express = require('express');
const request = require('request');
const app = express();

// For parsing post request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// TODO:HONG use slack awesome feature to style the message
// TODO:HONG also include a list of command that we have
app.post('/intro', (req, res) => {
    res.send('Hello Hong. Healthify will remind you when you should drink water!');
} );
app.post('/fulltank', (req, res) => {
    if ( interval ) {
        clearInterval(interval);
    }
    res.send('Hope you are hydrated :)');
} );

app.post('/water', (req, res) => {
    res.send('Drink some water!!');
    // console.log(req.headers['content-type'])
} );



// since we are using Heroku to host this server, we need to accept the port number given by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Example app listening on port 5000!'));


/** Send data from server to slack anytime we want without any request from slack.
 * We can use this to periodically notify user **/
const oneHour = 3600000;
const interval = setInterval(sendReminder, 5000);


function sendReminder() {
    const options = {
        url: 'http://localhost:5000/water',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            "text": "I am a test message http://slack.com",
            "attachments": [
                {
                    "text": "And here’s an attachment!"
                }
            ]
        })
    };

    request.post('https://hooks.slack.com/services/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', options).on('error', function(e) {
        console.log(e);
    }).on('response', function(response) {
        console.dir(response.statusCode);
    });
}

// TODO:HONG for now let have the following feature
    // 1. add a couple of command:
        // "/intro" give description of what the app is: also show what kind of command we have
        // "/waterify when user press this command, give them frequency options.
        // once you click sth, send that response to the server and start the interval
        // "/stop" stop the interval



// TODO:HONG need to figure out how to pass Slack's specific workspace url so that we can use this app on all sort of workspace