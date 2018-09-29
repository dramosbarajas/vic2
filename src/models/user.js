const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

let rolStatus : enum ['Admin_Role', 'User_Role'];
const userSchema = new Schema({
    email : { type: String, lowercase: true, unique: true, required : true},
    password : { String : true, required : true },
    nombre : { type: String, trim: true },
    apellido : { type: String, trim: true},
    avatar : { type : String, trim : true},
    passChanged : boolean,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt' }});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);