const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;


const userSchema = new Schema({
    email : { type: String, lowercase: true, unique: true, required : true},
    password : { type : String , required : true },
    nombre : { type: String, trim: true , default : ""},
    apellido : { type: String, trim: true, default : ""},
    avatar : { type : String, trim : true, default: "no_avatar"},
    passChanged : {type : Boolean , default: false},
    rol: { type : String, enum : ['Admin_Role', 'User_Role'], default:"User_Role"},
    active : { type : Boolean, default: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updatedAt' }});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
module.exports = mongoose.model('users', userSchema);