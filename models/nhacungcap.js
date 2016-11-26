var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var nhacungcapSchema = mongoose.Schema({
    maNhaCungCap: String,
    tenNhaCungCap: String,
    diaChi: String
}, {
    collection: 'nhacungcap'
});

module.exports = mongoose.model('nhacungcap', nhacungcapSchema);