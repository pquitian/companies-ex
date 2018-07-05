const mongoose = require('mongoose');
const DB_NAME = 'companies';
const MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(MONGO_URI)
    .then(() => console.info(`Connected to database ${DB_NAME}`))
    .catch(err => console.log("Database error", err))