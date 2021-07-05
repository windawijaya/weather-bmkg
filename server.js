const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const weather = require("./weather");
const resource = require("./weather/resource");

const app = express();

var PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/weather', weather.index);

app.listen(PORT, function () {
    console.log('Listening on port 4000');

    resource.get()
        .then(() => {
            const oneDayInMs = 86400000;
            setInterval(() => weather.get(), oneDayInMs);
        });
});