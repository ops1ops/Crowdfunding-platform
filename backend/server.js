const express = require('express');
const { PORT }  = require('./config/config');
const companyRoutes = require('./routes/company');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.set('json spaces', 5);

app.use('/api', companyRoutes, authRoutes);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;