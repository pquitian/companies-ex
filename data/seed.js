const faker = require('faker');
const mongoose = require('mongoose');
const Company = require('../models/company.model');

require('../configs/db.config');

let arrCompanies = [];
for (let i = 0; i < 20; i++) {
    let company = {
        name: faker.company.companyName(), 
        code: faker.company.companySuffix(),
        image: faker.image.imageUrl(),
        money: faker.finance.amount(),
        description: faker.lorem.sentence()
    } ;
    arrCompanies.push(company);
}

Company.insertMany(arrCompanies)
    .then(companies => {
        console.info(`Seeded ${companies.length} companies properly`);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Seeding error', err);
        mongoose.connection.close();
    });