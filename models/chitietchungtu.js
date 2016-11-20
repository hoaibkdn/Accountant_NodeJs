var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var ctct_tk = require('ctct_tk.js');

var chitietchungtuSchema = mongoose.Schema({
    idChiTiet: String,  
    dienGiai: String,
    maSoHangHoa: String,
    tienTe:[
    {
    	loaiTienTe: String,
    	tyGia: Number
    }],
    soLuong: Number,
    donGia: Number,
    giaTriThueSuat: Number,
    cacTaiKhoan:[ctct_tk]
}, {
    collection: 'chitietchungtu'
});

module.exports = mongoose.model('chitietchungtu', chitietchungtuSchema);
