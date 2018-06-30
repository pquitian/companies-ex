const mongoose = require('mongoose');
const Company = require('../models/company.model');

module.exports.list = (req, res, next) => {
    Company.find()
        .then(companies => {
            res.render('companies/companies', {
                companies
            });
        })
        .catch(err => {
            next(err);
        });
}

module.exports.get = (req, res, next) => { 
    const id = req.params.id; 

    Company.findById(id)
        .then(company => {
            res.render('companies/detail', {
                company
            });
        })
        .catch(err => {
            next(createError(404, `Company with ${id} not found`));
        });
}

module.exports.create = (req, res, next) => { 
    res.render('companies/create');
}

module.exports.doCreate = (req ,res, next) => {
    // let company = new Company(req.body);
    // company.save()
    //     .then(() => res.redirect('/'))
    //     .catch()
}
