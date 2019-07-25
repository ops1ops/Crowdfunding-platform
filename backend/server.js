const express = require('express');
const { PORT }  = require('./config/config');
const companyRoutes = require('./routes/company');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const confirmRoute = require('./routes/confirm');

const app = express();

app.use(express.json());
app.set('json spaces', 5);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
app.use('/api', companyRoutes, authRoutes, userRoutes, confirmRoute);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;