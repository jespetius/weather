const express = require('express');
const morgan = require('morgan');
const fetch = require('node-fetch');
const validateQuery =  require('./query_validator');
const errorHandler = require('./error_handler');
const app = express();
const port = 3000;
const weather = require('./weather');
const url = 'https://www.ilmatieteenlaitos.fi/observation-data?station=101004'



app.use(morgan('dev'));

app.use(express.json())
app.use(express.urlencoded ({ extended : true }))
app.get('/weather', validateQuery, (req, res, next) => {
    fetch(url)
        .then(res => res.json())
        .then(json => weather.useData(json, req.query))
        .then(json => res.send(json))

});
app.use(errorHandler);


app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
