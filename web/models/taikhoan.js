var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var taiKhoanSchema = mongoose.Schema({
    idTaiKhoan: String,
    tenTaiKhoan: String
}, {
    collection: 'taikhoan'
});

module.exports = mongoose.model('taikhoan', taiKhoanSchema);