function openTab(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}


/*------general-table------*/
$(document).ready(function(){
	var generalID = document.getElementById("general-table").childElementCount;
	$("#btn-add-row").click(function(){
    generalID++;
		$newRow = `
    <tr class="chitiet-${generalID}">
    <td>${generalID}</td>
    <td><input type="text" class="dienGiai" onchange="changeInTwoTable(this)"></td>
    <td><input type="text" class="maSoHH" onchange="changeInTwoTable(this)"></td>
    <td>
    <select onchange="changeInTwoTable(this)" data-sel="1" class="loaiTienTe">
    <option>VND</option>
    <option>USD</option>
    <option>POUD</option>
    </select>
    </td>
    <td onchange='thanhTien()' class="tyGia">1</td>
    <td><input type="text" class="tkNo"></td>
    <td><input type="text" class="tkCo"></td>
    <td><input type="text" class="soLuong" onchange='thanhTien(this)'></td>
    <td><input type="text" class="donGia" onchange='thanhTien(this)'></td>
    <td class="thanhTien"></td>
    </tr>

    `;
    $("#general-table").append($newRow);

    $newInvoiceRow = `
    <tr class="chitiet-${generalID}">
    <td>${generalID}</td>
    <td><input type="text" class="dienGiai" onchange="changeInTwoTable(this)"></td>
    <td><input type="text" class="maSoHH" onchange="changeInTwoTable(this)"></td>
    <td>
    <select class="loaiTienTe" onchange="changeInTwoTable(this)">
    <option>VND</option>
    <option>USD</option>
    <option>POUD</option>
    </select>
    </td>
    <td class="tyGia">1</td>
    <td><input type="text" class="tkNo"></td>
    <td><input type="text" class="tkCo"></td>
    <td><input type="text" class="soTienChuaVAT"></td>
    <td>
    <select class="giaTriThueSuat">
    <option value="0">Không thuế suất</option>
    <option value="0">0%</option>
    <option value="0.05">5%</option>
    <option value="0.1">10%</option>
    </select>
    </td>
    <td class="soTienVAT"></td>
    <td class="thanhTien"></td>
    </tr>
    `;
    $("#invoice-table").append($newInvoiceRow);
  });

	$("#btn-save-chitiet").click(function(event){
		event.preventDefault();
    var chungtu = {};
    chungtu.ngayChungTu = $("#ngayChungTu").val();
    alert("Ngay chungtu "+$("#ngayChungTu").val());
    chungtu.soChungTu = $("#soChungTu").val();
    chungtu.dienGiai = $("#dienGiai").val();
    chungtu.nhaCungCap = {};
    chungtu.nhaCungCap.maNhaCC = $("#maNhaCC").val();
    chungtu.nhaCungCap.tenNhaCC = $("#tenNhaCC").val();
    chungtu.nhaCungCap.diaChi = $("#diaChi").val();
    chungtu.hoaDon = {};
    chungtu.hoaDon.maSoThue = $("#maSoThue").val();
    chungtu.hoaDon.kyHieuHD = $("#kyHieuHoaDon").val();
    chungtu.hoaDon.mauSo = $("#mauSo").val();
    chungtu.hoaDon.ngayHD = $("#ngayHoaDon").val();
    chungtu.hoaDon.soHD = $("#soHoaDon").val();

    var tableData = [];

    $("#general-table").children("tr").each(function(index){
     var ct = {};
     ct.dienGiai = $(this).find("input.dienGiai").val();
     ct.maSoHangHoa = $(this).find("input.maSoHH").val();
     ct.loaiTienTe = $(this).find("select.loaiTienTe").val();
     ct.tyGiaTienTe = $(this).find("td.tyGia").text();
     ct.chung = {};
     ct.chung.tkNo = $(this).find("input.tkNo").val();
     ct.chung.tkCo = $(this).find("input.tkCo").val();
     ct.chung.soLuong = $(this).find("input.soLuong").val();
     ct.chung.donGia = $(this).find("input.donGia").val();
     ct.chung.thanhTien = $(this).find("td.thanhTien").text();
     tableData.push(ct);
   })

    $("#invoice-table").children("tr").each(function(index){
     var ct = tableData[index];
     ct.hd = {};
     ct.hd.tkNo = $(this).find("input.tkNo").val();
     ct.hd.tkCo = $(this).find("input.tkCo").val();
     ct.hd.soTienChuaVAT = $(this).find("input.soTienChuaVAT").val();
     ct.hd.giaTriThueSuat = $(this).find("select.giaTriThueSuat").val();
     ct.hd.soTienVAT = $(this).find("input.soTienVAT").val();
     tableData[index] = ct;
   })

    chungtu.cacChiTiet = tableData;
    console.log(chungtu);
    // $.post('/kttt_pnk', chungtu, function(data){

    // })
    $.ajax({
      type: "POST",
      url: "/kttt_pnk",
      contentType: 'application/json',
      data: JSON.stringify(chungtu),
      dataType: "json",
      success: function(data){
        console.log("success", data);
        $("#id-chungtu-saved").val(data._id);
        $("#form-redirect-to-phieuchitienmat").submit();
      },
      error: function(data){
        console.log("error", data);
      }
    })
  })

});

//tong tien phat sinh
$(document).ready(function(){
  var resultNo=0,
      resultCo=0,
      ChildNo = document.getElementsByClassName("congphatsinhNo");
      ChildCo = document.getElementsByClassName("congphatsinhCo");
  console.log(ChildNo);
  console.log(ChildCo);
  for (i=0;i<ChildNo.length;i++){
    resultNo += parseInt(ChildNo[i].innerHTML);
    resultCo += parseInt(ChildCo[i].innerHTML);
    console.log("result",ChildCo[i].innerHTML);
    console.log("in: ",parseInt(ChildNo[i].innerHTML));
  }
  $("#cpsNo").text(resultNo);
  $("#cpsCo").text(resultCo);
  $("#cpsTM").text(resultNo);
})

//phan hoi tu ke toan truong
$(document).ready(function(){
  $(".phanHoiKTTT").click(function(){
    $.ajax({
      type: "POST",
      url: "/phanhoi",
      success: function(){
        console.log("success");
        alert("Đã gửi phản hồi đến kế toán thanh toán");
      },
      error: function(){
        alert("Gửi phản hồi thất bại");
      }
    })
  })

  $("#idPhanHoi").click(function(){
    $("#idPhanHoi").css("display","none");

    $.ajax({
      type: "POST",
      url: "/user/xemphanhoi",
      success: function(){
        console.log("success");
      },
      error: function(){
        alert("Bạn có phản hồi từ kế toán trưởng vể việc nhập xuất hàng hóa");
      }
    })
  })
})

$(document).ready(function(){

  //set open modal
  $("#open-modal-socai").click(function(){
    $("#so-cai-tk").modal("show");
  });

  //tong tien cong phat sinh
});

function donViChange(unit){
  changeInTwoTable(unit);
  const ar_tyGia = [1,22500, 40000];
  var idx = unit.selectedIndex;
  console.log($(unit).parent().siblings(".tyGia"));
  $("td.tyGia").text(ar_tyGia[idx]);
}

function thanhTien(node){
	var tagName = node.tagName;
  var className = $(node).attr('class').split(" ")[0];
  var rowClass = $(node).closest("tr").attr("class");
  var quantity = $("#general-table").find(`tr.${rowClass}`).find(`input.soLuong`).val();
  var unit_price = $("#general-table").find(`tr.${rowClass}`).find('input.donGia').val();
  var exchange_rate = $("#general-table").find(`tr.${rowClass}`).find('td.tyGia').text();
  var total = exchange_rate*quantity*unit_price;
  $("#general-table").find(`tr.${rowClass}`).find('td.thanhTien').text(total);
}

function changeMaNCC(maNCC){
  const ar_tenNCC = ["Công ty gỗ nội thất","Công ty nguyên vật liệu xây dựng"];
  const ar_diaChiNCC = ["Quận Hải Châu, Đà Nẵng","Quận Thanh Khê, Đà Nẵng"];
  var inx_maNCC = maNCC.selectedIndex;
  $("#tenNhaCC").val(ar_tenNCC[inx_maNCC]);
  $("#diaChi").val(ar_diaChiNCC[inx_maNCC]);
}

function changeTK(idTK){
  const ar_tenTK = ["Nguyên vật liệu","Các khoản phải trả", "Thuế giá trị gia tăng", "Tiền mặt"];
  var inx_idTK = idTK.selectedIndex;
  $("#tenTK").val(ar_tenTK[inx_idTK]);
}

function changeNCC(maNCC){
  const ar_tenNCC = ["Công ty gỗ nội thất","Công ty nguyên vật liệu xây dựng"];
  var inx_maNCC = maNCC.selectedIndex;
  $("#tenNCC").val(ar_tenNCC[inx_maNCC]);
}

function changeInTwoTable(node){
  var tagName = node.tagName;
  var className = $(node).attr('class').split(" ")[0];
  var rowClass = $(node).closest("tr").attr("class");
  if(tagName == "SELECT" && className == "loaiTienTe"){
    console.log($("#general-table").find(`tr.${rowClass}`).find(`td.tyGia`))
    const ar_tyGia = [1,22500, 40000];
    $(`tr.${rowClass}`).find(`td.tyGia`).text(ar_tyGia[node.selectedIndex])
    thanhTien(node);
  }
  console.log($("#general-table").find(`tr.${rowClass}`).find(`${tagName}.${className}`))
  console.log($("#invoice-table").find(`tr.${rowClass}`).find(`${tagName}.${className}`))
  $("#general-table").find(`tr.${rowClass}`).find(`${tagName}.${className}`).val($(node).val())
  $("#invoice-table").find(`tr.${rowClass}`).find(`${tagName}.${className}`).val($(node).val())
}

//set select in phieu nhap kho
$(document).ready(function(){
  $("#phieu-nhap-kho").click(function(){
    $.ajax({
      url: "/locsocai/yeucauNCC",
      success: function(data){
        console.log(data.optionNCC[0]);
      },
      error: function (err){
        console.log("err " + err);
      }
  })
  });
});


// get nha cung cap va tai khoan
$(document).ready(function(){
  $("#open-modal-socai").click(function(){
    $("#tai-khoan").empty();
    $("#nha-cung-cap").empty();
    var getlistTK = $.ajax({
      url: "/locsocai/yeucauTK",
      success: function(data){
        console.log(data.optionNum[1]);
        for( var i in data.optionNum){
          console.log(data.optionNum[i].idTaiKhoan);
          $("#tai-khoan").append("<option value='"+data.optionNum[i].idTaiKhoan+"'>"+data.optionNum[i].idTaiKhoan+"</option>");
        }
        return;
      },
      error : function (err){
        console.log("err " + err);
        return;
      }
    });

    var getlistNCC = $.ajax({
      url: "/locsocai/yeucauNCC",
      success: function(data){
        console.log(data.optionNCC[0]);
        for (var j in data.optionNCC){
          console.log(data.optionNCC[j].maNhaCungCap);
          $("#nha-cung-cap").append("<option value='"+data.optionNCC[j].maNhaCungCap+"'>"+data.optionNCC[j].maNhaCungCap+"</option>");
        }
        return;
      },
      error : function (err){
        console.log("err " + err);
        return;
      }
    })
  });
});

function thanhTienHoaDon(node){
  var tagName = node.tagName;
  var className = $(node).attr('class').split(" ")[0];
  var rowClass = $(node).closest("tr").attr("class");
  var price = parseFloat($("#invoice-table").find(`tr.${rowClass}`).find('input.soTienChuaVAT').val());
  var exchange_rate = parseFloat($("#invoice-table").find(`tr.${rowClass}`).find('td.tyGia').text());
  var giaTriThueSuat = parseFloat($('select[name=giaTriThueSuat]').val());
  console.log("giaTriThueSuat "+giaTriThueSuat);
  var soTienVAT = parseFloat(exchange_rate*price*giaTriThueSuat);
  var total = parseFloat(soTienVAT) + parseFloat(price);
  $("#invoice-table").find(`tr.${rowClass}`).find('td.soTienVAT').text(soTienVAT);
  $("#invoice-table").find(`tr.${rowClass}`).find('td.thanhTien').text(total);
}

//thanh tien phieu chi
function thanhTienPhieuChi(node){
  var tagName = node.tagName;
  var className = $(node).attr('class').split(" ")[0];
  var rowClass = $(node).closest("tr").attr("class");
  var price = parseFloat($("#general-table-chi").find(`tr.${rowClass}`).find('input.donGia').val());
  var quantity = parseFloat($("#general-table-chi").find(`tr.${rowClass}`).find('input.soLuong').val());
  var exchange_rate = parseFloat($("#general-table-chi").find(`tr.${rowClass}`).find('td.tyGia').text());
  var giaTriThueSuat = parseFloat($('select[name=giaTriThueSuat]').val());
  console.log("giaTriThueSuat "+giaTriThueSuat);

  var soTienVAT = parseFloat(exchange_rate*price*giaTriThueSuat*quantity);
  var total = parseFloat(soTienVAT) + parseFloat(price);
  $("#general-table-chi").find(`tr.${rowClass}`).find('td.thanhTien').text(total);
}
//tong tien cong phat sinh of tai khoan
$(document).ready(function(){
  var generalID = document.getElementById("general-table-chi").childElementCount;
  $("#btn-add-row-pc").click(function(){
    generalID++;
    $newRow = `
    <tr class="chitiet-${generalID}">
    <td>${generalID}</td>
    <td><input type="text" class="dienGiai" onchange="changeInTwoTable(this)"></td>
    <td><input type="text" class="maSoHH" onchange="changeInTwoTable(this)"></td>
    <td>
    <select onchange="changeInTwoTable(this)" data-sel="1" class="loaiTienTe">
    <option>VND</option>
    <option>USD</option>
    <option>POUD</option>
    </select>
    </td>
    <td onchange='thanhTien()' class="tyGia">1</td>
    <td><input type="text" class="tkNo"></td>
    <td><input type="text" class="tkCo"></td>
    <td><input type="text" class="soLuong"></td>
    <td><input type="text" class="donGia"></td>
    <td>
      <select onchange="thanhTienHoaDon(this)" class="giaTriThueSuat" 
      name="giaTriThueSuat">
        <option value="0">Không thuế suất</option>
        <option value="0">0%</option>
        <option value="0.05">5%</option>
        <option value="0.1">10%</option>
      </select>
    </td>
    <td class="thanhTien"></td>
    </tr>
    `;
    $("#general-table-chi").append($newRow);
  })

  $("#btn-save-pc").click(function(event){
    event.preventDefault();
    var phieuchi = {};
    phieuchi.ngayChungTu = $("#ngayChungTu").val();
    phieuchi.soChungTu = $("#soChungTu").val();
    phieuchi.dienGiai = $("#dienGiai").val();
    phieuchi.nhaCungCap = {};
    phieuchi.nhaCungCap.maNhaCC = $("#maNhaCC").val();
    phieuchi.nhaCungCap.tenNhaCC = $("#tenNhaCC").val();
    phieuchi.nhaCungCap.diaChi = $("#diaChi").val();
    phieuchi.hoaDon = {};
    phieuchi.hoaDon.maSoThue = $("#maSoThue").val();
    phieuchi.hoaDon.kyHieuHD = $("#kyHieuHoaDon").val();
    phieuchi.hoaDon.mauSo = $("#mauSo").val();
    phieuchi.hoaDon.ngayHD = $("#ngayHoaDon").val();
    phieuchi.hoaDon.soHD = $("#soHoaDon").val();

    var tableData = [];

    $("#general-table-chi").children("tr").each(function(index){
      var pc = {};
      pc.dienGiai = $(this).find("input.dienGiai").val();
      pc.maSoHangHoa = $(this).find("input.maSoHH").val();
      pc.loaiTienTe = $(this).find("select.loaiTienTe").val();
      pc.tyGiaTienTe = $(this).find("td.tyGia").text();
      pc.chung = {};
      pc.chung.tkNo = $(this).find("input.tkNo").val();
      console.log("tk No "+pc.chung.tkNo);
      pc.chung.tkCo = $(this).find("input.tkCo").val();
      pc.chung.soLuong = $(this).find("input.soLuong").val();
      pc.chung.donGia = $(this).find("input.donGia").val();
      pc.chung.thanhTien = $(this).find("td.thanhTien").text();
      pc.chung.giaTriThueSuat = $(this).find("select.giaTriThueSuat").val();
      tableData.push(pc);
   })

    phieuchi.cacChiTiet = tableData;
    console.log("phieu chi "+phieuchi);

    $.ajax({
      type: "POST",
      url: "/submitphieuchi",
      contentType: 'application/json',
      data: JSON.stringify(phieuchi),
      dataType: "json",
      success: function(data){
        console.log("success", data);
        alert("Đã hoàn thành phiếu chi");
      },
      error: function(data){
        alert("fail");
        console.log("error", data);
      }
    })
  })  
})

//get data from Phieu chi tien mat