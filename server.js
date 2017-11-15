const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Welcome to Healthify'));
app.post('/water', (req, res) => {
    setInterval(() => res.send('Drink some water!!'), 10 );
} );

// since we are using Heroku to host this server, we need to accept the port number given by Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Example app listening on port 3000!'));