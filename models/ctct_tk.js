var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var ctct_tkSchema = mongoose.Schema({
    idChiTietCT: String,
    idTaiKhoan: String,
    tkNo: Number,
    tkCo:Number
}, {
    collection: 'ctct_tk'
});

module.exports = mongoose.model('ctct_tk', taiKhoanSchema);
