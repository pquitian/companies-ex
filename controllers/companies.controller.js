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
    res.render('companies/create', {
        company: new Company()
    });
}

module.exports.doCreate = (req, res, next) => {
    let company = new Company(req.body);
    company.save()
        .then(() => res.redirect('/'))
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.render('company/create', {
                    company: company,
                    errors: error.errors
                });
            } else {
                next(err);
            }
        });
};

module.exports.edit = (req, res, next) => {
    const id = req.params.id; 
    Company.findById(id)
        .then(company => {
            res.render('companies/create',{
                company
            });
        })
        .catch((err)=>{
            next(err)
        });
};

module.exports.doEdit = (req, res, next) => {
    // let company = new Company(req.body);
    const id = req.params.id;

    Company.findById(id)
        .then(company => {
            if(company) {
                Object.assign(company, req.body);
                company.save()
                    .then(() => {
                        res.redirect(`/companies/${id}`);
                    })
                    .catch(err => {
                        if(err instanceof mongoose.Error.ValidationError) {
                            res.render('companies/create', {
                                companies: companies, 
                                error: error.errors
                            });
                        } else {
                            next(error);
                        }
                    })
            } else {
                next(err);
            }
        })
        .catch(err => next(err));
};

module.exports.delete = (req, res, next) => {
    const id = req.params.id;

    Company.findByIdAndRemove(id)
    .then(()=>{
        res.redirect('/companies');
    })
    .catch((err)=>{
        next(err);
    })
}
