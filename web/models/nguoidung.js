var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = mongoose.Schema({
    tenDangNhap: String,
    matKhau: String,
    email: String,
    role: Number,
    phanHoi: Number
}, {
    collection: 'nguoidung'
});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    // return true;
    return bcrypt.compareSync(password, this.matKhau);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('nguoidung', userSchema);