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
    <option>Không thuế suất</option>
    <option>0%</option>
    <option>5%</option>
    <option>10%</option>
    </select>
    </td>
    <td><input type="text" class="soTienVAT"></td>
    <td></td>
    </tr>
    `;
    $("#invoice-table").append($newInvoiceRow);
  });

	$("#btn-save-chitiet").click(function(event){
		event.preventDefault();
    var chungtu = {};
    chungtu.ngayChungTu = $("#ngayChungTu").val();
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
    console.log(chungtu)
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

function donViChange(unit){
  changeInTwoTable(unit);
  const ar_tyGia = [1,22500, 40000];
  var idx = unit.selectedIndex;
  console.log($(unit).parent().siblings(".tyGia"));
  $("td.tyGia").text(ar_tyGia[idx]);
}

function thanhTien(node){
	// var generalID = document.getElementById("general-table").childElementCount;
	// var exchange_rate = document.getElementById("ty-gia-"+generalID).innerHTML;
	// var quantity = document.getElementById("so-luong-"+generalID).value;
	// var unit_price = document.getElementById("don-gia-"+generalID).value;
	// var total = exchange_rate*quantity*unit_price;
	// document.getElementById("thanh-tien-"+generalID).innerHTML = total;
	var tagName = node.tagName;
  var className = $(node).attr('class').split(" ")[0];
  var rowClass = $(node).closest("tr").attr("class");
  var quantity = $("#general-table").find(`tr.${rowClass}`).find(`input.soLuong`).val();
  var unit_price = $("#general-table").find(`tr.${rowClass}`).find('input.donGia').val();
  var exchange_rate = $("#general-table").find(`tr.${rowClass}`).find('td.tyGia').text();
  var total = exchange_rate*quantity*unit_price;
  $("#general-table").find(`tr.${rowClass}`).find('td.thanhTien').text(total);
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

/*------export pdf------*/
// $("#btnPrint").live("click", function () {
//   var divContents = $("#main-wrapper").html();
//   var printWindow = window.open('', '', 'height=400,width=800');
//   printWindow.document.write('<html><head><title>DIV Contents</title>');
//   printWindow.document.write('</head><body >');
//   printWindow.document.write(divContents);
//   printWindow.document.write('</body></html>');
//   printWindow.document.close();
//   printWindow.print();
// });
