const app = require('express')();
const companyRoutes = require('./company');

app.use('/api', companyRoutes);


module.exports = app;