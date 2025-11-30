var DATA_PARAM_STORAGE = {
	by_tipe_penyimpanan : null
}
function set_data_paramStorage( param ) {
	//Buat aturan ENUM hanya bisa diisi dengan nilai lokal, cloud, dan url
	if ( param == "lokal" || param == "cloud" || param == "url"  ) {
		DATA_PARAM_STORAGE.by_tipe_penyimpanan = param;
	}else{
		//Jika tidak sesuai kita bisa asumsikan ada kesalahan pada alurs sistem atau ada yang mencoba isen.
		alert("KESALAHAN FATAL ENUM, PARAMETER TIDAK SESUAI DAN HUBUNGI DEVELOPER TERKAIT");
		$('body').remove();
	}
};


$(function() {

	//Event col_indicator_str melakukan load data berdasarkan nilai atribut id nya  
	$('.col_indicator_str').on('click', function() {
		var col_indicator_str_target = $(this);
		var col_indicator_str = $('.col_indicator_str');

		//Menghilangkan tanda active agar yang di tidak klik itu tidak aktif 
		col_indicator_str.removeClass('active');
		//Memeberikan tanda agar yang di klik itu aktif 
		col_indicator_str_target.addClass('active');

		//Isi parameterr DATA_PARAM_STORAGE nya berdasarkan id indicator yang di klik atau pilih
		var id_indicator = col_indicator_str_target.attr('id');
		set_data_paramStorage( id_indicator  );
		load_storage();
	});
	//Klik lokal ketika baru pertama kali di load halamannya 
	$('.col_indicator_str').filter('#lokal').click();

	//Event melakukan load secara general ke tabel, nantinya load storage ini akan melakukan load berdasarkan parameter DATA_PARAM_STORAGE
	$('#load_data_file').on('click', function() {
		load_storage();
	});
	//Melakukan binding event ketika form modal_tambahFile_async melakukan submit yaitu setelah submit langsung load storage ulang berdasarkan input tipe penyimpanan yang dipilih pada form. INGAT!! Event aslinya ada di file.js
	$('#modal_tambahFile_async form').on('submit', function() {
		var form = $(this);
		//Mengambil nilai tipe penyimpananan
		var tipe_penyimpanan = form.find('[name=tipe_penyimpanan]').val();
		$('.col_indicator_str').filter('#'+tipe_penyimpanan).click();
	});
});



function load_storage( data_param = DATA_PARAM_STORAGE ) {
	
	// Load Data Detail Informasi Kapasitas 
	load_data_kapasitas();

	var url_endpoint = URL_SERVICE_FILE + "File";

	//Menambahkan header tabel 
	// ====== Header Manual di JS ======
	loader_page('show', '#loader_page_table', "Mengambil data file....");
	get_data( url_endpoint, data_param, function( response ) {

		//Bersihkan td load data agar yang di load adalah data baru
		var table_data_file = $('#table_data_file');
		var tbody = table_data_file.find("tbody");
		tbody.html(" ");

		if ( response != null ) {
			loader_page('hide', '#loader_page_table', null);

			// ====== Isi body table dengan loop data ======
			for (var i = 0; i < response.length; i++) {
				var row_data = response[i];
				var row_json = cv_obj_json( row_data );
				var tr_data = `
				<tr data-row=${row_json}>
				<td>
				<button class="btn btn-default btn_opt">
				<i class="fas fa-ellipsis-v"></i>
				</button>
				<div class="menu_opt">
				<div class="link_opt close_opt">Tutup</div>
				</div>
				</td>
				<td>${i+1}</td>
				<td>${row_data.id_file}</td>
				<td>
				<div class="btn btn-success btn_download" data-href="${row_data.source_file}" target="_blank"> 
				<i class="fas fa-download"> </i>
				</div>
				</td>
				<td>${row_data.nama_file}</td>
				<td>${row_data.tipe_penyimpanan}</td>
				<td>${kbToMb(row_data.size_file_kb)} MB </td>
				<td>${row_data.user_admin}</td>
				<td>${row_data.waktu}</td>
				<td><div class="label ${row_data.status.toLowerCase()}">${row_data.status}</div></td>
				</tr>
				`;
				tbody.append(tr_data);
			}
		}else{
			loader_page('hide', '#loader_page_table', "Gagal Mengambil Data Masalah Server Guyss...");
		}
	});

}

