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
		$("#general-table").append(
			"<tr>"+
			"<td>"+generalID+"</td>"+
			"<td><input type='text'></td>"+
			"<td><input type='text'></td>"+
			"<td>"+
			"<select onchange='donViChange(this)' data-sel='"+generalID+"'>"+
			"<option>VND</option>"+
			"<option>USD</option>"+
			"<option>POUD</option>"+
			"</select>"+
			"</td>"+
			"<td id='ty-gia-"+generalID+"' onchange='thanhTien();'></td>"+
			"<td><input type='text'></td>"+
			"<td><input type='text'></td>"+
			"<td onchange='thanhTien();'><input type='number' id='so-luong-"+generalID+"'></td>"+
			"<td onchange='thanhTien();'><input type='number' id='don-gia-"+generalID+"'></td>"+
			"<td id='thanh-tien-"+generalID+"'></td>"+
			"</tr>"
			);

	});
});

function donViChange(unit){
	var generalID = document.getElementById("general-table").childElementCount;
	console.log("generalID "+generalID);
	var ar_tyGia = [1,22500, 40000];
	var idx = unit.selectedIndex;
	document.getElementById("ty-gia-"+unit.getAttribute('data-sel')).innerHTML =ar_tyGia[idx] ;
	var exchange_rate = document.getElementById("ty-gia-"+generalID).innerHTML;
}

function thanhTien(){
	var generalID = document.getElementById("general-table").childElementCount;
	var exchange_rate = document.getElementById("ty-gia-"+generalID).innerHTML;
	alert(exchange_rate);
	var quantity = document.getElementById("so-luong-"+generalID).value;
	var unit_price = document.getElementById("don-gia-"+generalID).value;
	var total = exchange_rate*quantity*unit_price;
	document.getElementById("thanh-tien-"+generalID).innerHTML = total;
	
}

$(document).ready(function(){

})