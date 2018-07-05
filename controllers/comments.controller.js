const createError = ('http-errors');
const mongoose = require('mongoose');

const Company = require('../models/company.model');
const Comment = require('../models/comment.model');

module.exports.doCreate = (req, res, next) => {
    const { id } = req.params; 
    console.log('Params: ', req.params)
    console.log('Body ', req.body);
    
    Company.findById(id)
        .then(company => {
            if(company) {
                let comment = new Comment({
                    title: req.body.title, 
                    text: req.body.text, 
                    company: company._id
                });

                comment.save()
                    .then(() => {
                        company.comments.push(comment)

                        return company.save();
                    })
                    .then(() => {
                        res.redirect(`companies/${id}`);
                    })
                    .catch(err => {
                        if(err instanceof mongoose.Error.ValidationError) {
                            res.render('companies/detail', {
                                company: company, 
                                errors: error.errors
                            });
                        } else {
                            next(err);
                        }
                    })
            } else {
                next(createError(404, `Company with id ${id} not found`));
            }
        })
        .catch(err => {
            if(err instanceof mongoose.Error.CastError){
                next(createError(404, `Company with ${id} not found`));
            } else {
                next(err);
            }
        });

}