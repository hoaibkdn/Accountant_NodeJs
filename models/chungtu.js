var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var chungtuSchema = new Schema({
  loaiChungTu: String,
  ngayChungTu: {
    type: Date,
    default: Date.now
  },
  soChungTu: String,
  dienGiai: String,
  nhaCungCap: {
    maNhaCC: String, 
    diaChi: String,
    tenNhaCC: String
  },
  maSoThue: String,
  ngayNhapKho: Date,
  hoaDon: {
    kyHieuHD: String,
    mauSo: String,
    ngayHD: Date,
    soHD: String
  }, 
  cacChiTiet: [
  {
    dienGiai: String,
    mauSoHangHoa: String,
    tienTe: {
      loai: String,
      tyGia: Number,
    },
    soLuong: Number,
    donGia: Number,
    giaTriThueSuat: Number,
    cacTaiKhoan: [{
      idTaiKhoan: String,
      tenTaiKhoan: String,
      tkNo: Number,
      tkCo: Number,
    }]
  }
  ]
}, {
  collection: "chungtu"
});


// create the model for users and expose it to our app
module.exports = mongoose.model('chungtu', chungtuSchema);