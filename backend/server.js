const express = require('express');
const db = require('./db/db');

const app = express();



app.get('/', (req, res) => {

});

const port = 8080;

app.listen(port, () => console.log(`Server started on ${port}`));