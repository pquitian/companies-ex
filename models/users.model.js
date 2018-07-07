const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 ;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:'Email is required',
        unique: true
    }, 
    password: {
        type: String,
        required: 'Password is required'
    }
})

userSchema.pre('save', function(next) {
 if(!this.isModified('password')) return next();

 bcrypt.genSalt(saltRounds)
    .then((saltValue) => {
        return bcrypt.hash(this.password, saltValue)
    })
    .then((hash) => {
        this.password = hash;
        console.log(this.password)
        next();
    })
    .catch((error)=> {
        this.password = null;
        next();
    })
})


module.exports = mongoose.model('Users',userSchema);
   
