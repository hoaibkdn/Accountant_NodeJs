var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var chitietchungtu = require('chitietchungtu.js');

var chungtuSchema = mongoose.Schema({
  id: String,
  loaiChungTu: String,
  ngayChungTu: Date,
  soChungTu: String,
  dienGiai: String,
  nhaCungCap: {
    maNhaCungCap: String,
    tenNhaCungCap: String,
    diaChi: String
  },
  maSoThue: String,
  ngayNhapKho: Date,
  hoaDon: {
    kyHieuHoaDon: String,
    mauSo: String,
    ngayHD: String,
    soHD: String
  },
  cacchitiet: [chitietchungtu]
}, {
    collection: 'chungtu'
});

module.exports = mongoose.model('chungtu', chungtuSchema);
