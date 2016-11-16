var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var taiKhoanSchema = mongoose.Schema({
    idTaiKhoan: String,
    tenTaiKhoan: String,
    soDuCuoiKy: Number,
}, {
    collection: 'taikhoan'
});