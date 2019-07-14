const app = require('./routes/index');
const { PORT }  = require('./config/config');

app.set('json spaces', 5); //normal json view

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

module.exports = app;