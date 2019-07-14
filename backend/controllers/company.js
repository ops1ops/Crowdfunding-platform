const Company = require('../models/Company');

module.exports = {

}



Company.findAll()
    .then(companies => {
        console.log("All companies: ", JSON.stringify(companies, null, 4));
        console.log(companies[0].createdAt);
    })


