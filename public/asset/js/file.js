// Script ini terhubung dengan api.js
var URL_SERVICE_APP = URL_SERVICE_FILE; //Tempat Aplikasi Service BE Route Utama Basis CI 
var URL_API_FILE_LOKAL = URL_SERVICE_APP + "File"; //Controller service file di aplikasi route utama
var URL_API_FILE_CLOUD = URL_SERVICE_APP + "service_cloud/"; //URL SERVICE BE CLOUD untuk melakukan penyimpanan ke cloud yang terletak di aplikasi service file utama
var URL_ASSET_STORAGE = URL_SERVICE_APP + "asset_storage/"; //Tempat user menyimpan file secara lokal
var TIPE_PENYIMPANAN_PARAM = false; //Menampilkan semua file tanpa filter kategori

var OBJ_MEDIA = {
	dokumen : ["doc", "docx", "xls", "xlsx", "ppt", "pptx"],
	pdf : ["pdf"],
	img : ["jpg", "jpeg", "png", "gif", "webp"],
	audio : ["mp3", "wav", "ogg"],
	video : ["mp4", "webm", "ogg"],
	code : ["sql", "json", "js", "html", "css", "xml", "php", "py", "java"],
	text : ["txt"]
};

$(document).ready(function() {	


	//+++++++++++ Method event untuk modal view file +++++++++++ ==================================================

	// Event untuk melihat file 
	$('body').on('click', '.btn_modal_view', function() {
		var el_btn_modal_view = $(this);
		btn_modal_view( el_btn_modal_view );
	});
	$(document).on("click", ".btn_copy", function() {
		var btn_copy = $(this);
		var view_el = btn_copy.parents('.view_el');
		var content_view = view_el.find('.content_view');
		var text = content_view.text();
		navigator.clipboard.writeText(text).then(function() {
			alert("Berhasil disalin ke clipboard!");
		}).catch(function(err) {
			alert("Gagal menyalin: " + err);
		});
	});
	//+++++++++++ Method Event untuk di modal select file dan modal tambah file asycn +++++++++++ ==================================================
	// $('#modal_select_file').modal('show');
	//Memunculkan semua modal tambah data di admin
	// $('#modal_tambah').modal('show');

	//Interopability file handling 	
	//Akan menambahkan element berkaitan dengan semua modal file upload section ke setiap form yang menggunakan class .form_file_upload
	el_form_file_upload();

	//Event untuk di modal tambah file untuk tipe penyimpanan
	validasi_tipe_penyimpanan();
	$('select[name=tipe_penyimpanan]').on('change', function(e) {
		validasi_tipe_penyimpanan();
	});

	//Modal ketika tombol Pilih di modal_select_file di tekan
	// Event untuk tombol submit untuk pilih file
	$('#modal_select_file .btn_submit_select').on('click', function(e) {
		submit_select_file();
	});

	//Modal ketika tombol preview di modal_select_file di tekan
	// Event untuk tombol preview untuk col_file yang dipiih yang akan dibuka di modal view file
	$('#modal_select_file .btn_preview_select').on('click', function () {
		var modal_select_file = $('#modal_select_file');
		var col_file_active = modal_select_file.find('.col_file').filter('.active');
		if ( col_file_active.length > 0 ) {
			console.log("Col file ada yang dipilih, maka bisa di preview");
			var data_sourceFile = col_file_active.attr('data-sourceFile');
			open_modal_view( data_sourceFile );
		}else{
			console.log("Col file tidak ada yang dipilih, maka tidak bisa di preview");
		}
	});


	//Melakukan asynchronous ajax untuk pertama kali dengan ambil data file yang di upload ketika modal select file muncul
	$('.indicator_tipe_penyimpanan').on('click', function(){

		var indicator_tipe_penyimpanan = $('.indicator_tipe_penyimpanan');
		var indicator_tipe_penyimpanan_target = $(this);

		var id = indicator_tipe_penyimpanan_target.attr('id');
		if ( id == "all" ) {
			id = false;
		}


		TIPE_PENYIMPANAN_PARAM = id;
		indicator_tipe_penyimpanan.removeClass('active');
		indicator_tipe_penyimpanan_target.addClass('active');

		load_ajax_modalFileSelect();
	});
	$('#modal_tambahFile_async').on('shown.bs.modal', function() {
		var form = $(this).find('form');
		form.trigger('reset'); //Reset form
		el_load_modalFileTambah("hide", "....");
	});
	$('#modal_select_file').on('shown.bs.modal', function (event) {
		load_ajax_modalFileSelect();
	});
	// Event refresh ulang pada modal select file 
	$('.btn_refresh_select').on('click', function(e) {
		load_ajax_modalFileSelect();
	});

	// Event ajax untuk modal tambah file async untuk melakukan upload dan tambah data file secara asynchronous 
	// $('#modal_tambahFile_async').modal('show')
	$('#modal_tambahFile_async form').on('submit', function (e) {
		e.preventDefault(); // Mencegah reload halaman

		console.log("Submit asynchronous untuk modal_tambahFile_async");

		var form = $(this);
		var modal_tambahFile_async = form.parents('.modal');
		let formData = new FormData(); // Membuat objek FormData

		let nama_file = modal_tambahFile_async.find('input[name=nama_file]').val();
		let tipe_penyimpanan = modal_tambahFile_async.find('select[name=tipe_penyimpanan]').val();
		let user_admin = modal_tambahFile_async.find('input[name=user_admin]').val();

		//Menambahkan data bukan file ke yang ingin dikirim
		formData.append('nama_file', nama_file); // Tambahkan file ke FormData
		formData.append('submit', "async"); // Tambahkan submit text ke FormData
		formData.append('tipe_penyimpanan', tipe_penyimpanan); // Tambahkan tipe penyimpanan text ke FormData
		formData.append('user_admin', user_admin); // Tambahkan user_admin ke FormData

		//Menentukan jenis dan bentuk file yang akan di upaload berdasarkan tipe penyimpanannya
		var URL_API_FILE; //Ditentukan berdasarkan tipe_penyimpanan
		if ( tipe_penyimpanan == "lokal" || tipe_penyimpanan ==  "cloud") {
			//Jika dipilih lokal atau cloud, maka tambahkan data form berupa object file yang di upload oleh client  
			let upload_file = form.find('input[name=upload_file]')[0].files[0]; // Ambil file dari input
			formData.append('upload_file', upload_file); // Tambahkan file ke FormData dan menjadikan paremeter di BE yang nanti ditangkapp sebagai $_FILES

			//Berikan batasan file max hanya 30 MB saja 
			var max_input = 30 * 1024 * 1024;
			if ( upload_file.size > max_input ) { // 30 MB
				alert("File terlalu besar! Maksimal 30 MB");
				return 1;//Hentikan laju fungsi;
			}

			//Tentukan URL_API_FILE tempat menyimpan berdasarkan tipe penyimpanan server nya 
			if ( tipe_penyimpanan == "lokal" ) {
				URL_API_FILE = URL_API_FILE_LOKAL;
			}else if (  tipe_penyimpanan == "cloud" ){
				URL_API_FILE = URL_API_FILE_CLOUD;
			}
		}else{	
			//Jika dipilih lokal, maka tambahkan data form berupa url text 
			var url_file = form.find('input[name=url_file]').val();
			formData.append('url_file', url_file); // Tambahkan file ke FormData
		}  
		console.log(formData);

		//Munculkan load file
		el_load_modalFileTambah("show", "Menambahkan data....");

		//Melakukan upload data dan menambahkan ke database 
		var url_endpoint = URL_API_FILE_LOKAL + "/post_tambah_file";
		console.log("+++ Melakukan request POST ke", url_endpoint);
		$.ajax({
			url:  url_endpoint, // Ganti dengan URL server
			type: 'POST',
			data: formData,
			headers : {
				"X-User-Login" : get_userLogin()
			},
			processData: false, // Jangan memproses data
			contentType: false, // Jangan atur jenis konten
			xhr: function() {//Untuk mendapatkan progress saat mengirim input ke BE 
				var xhr = $.ajaxSettings.xhr();
				if (xhr.upload) {
					//Kalo browser sudah bisa upload 
					//Maka jalankan event progress untuk mendapatkan detail file yang sedang terkirim berkala
					xhr.upload.addEventListener("progress", function(e) {
						//Cek apakah size bisa diketahui oleh browsser atau tidak
						var cek_size_data = e.lengthComputable
						if ( cek_size_data == true ) {
							var size_file_terkirim = e.loaded; //Total size file yang sudah terkirim
							var size_file_semua = e.total; //Total size yang file yang akan dikirim
							var percent = ( size_file_terkirim / size_file_semua ) * 100;
							console.log("Upload progress: " + percent + "%");
							//Implementasi ke bar indicator file  
							var bar_indicator_target = $('.bar_indicator_el#bar_tambah_file');
							bar_indicator_implement(bar_indicator_target, percent);
						}
					});
				}
				return xhr;
			},
			// Ketika input berhasil terkirim
			success: function (res) {
				//res sudahdalam bentuk JSON
				var response = res;
				console.log("+++++ Response +++++++++ ");
				console.log( "Sebelum Parsing", res );
				console.log("Sesudah Parsing", response);

				if ( response.status == true ) {
					// Hilangkan load ajax file tambah
					var msg = response.msg;
					el_load_modalFileTambah("hide", msg);

					//reset form modal tambah 
					setTimeout(function() {
						modal_tambahFile_async.modal('hide');
					}, 100);
					//Jika ada modal_select_file sedang terbuka, maka muat ulang data di modal select file 
					var modal_select_file = $('#modal_select_file');
					if ( modal_select_file.is(':visible') ) {
						load_ajax_modalFileSelect();
					}
				}else{
					var msg = response.msg;
					el_load_modalFileTambah("show", msg);
				}

			},
			error: function (xhr, textStatus, errorThrown) {
				var err_kode = xhr.status;
				var msg_err = '<p>Upload gagal: ' + errorThrown + err_kode + '</p>' ;
				console.log( xhr );
				console.log( msg_err );
				el_load_modalFileTambah("show", msg_err);
			}
		});


	});
//+++++++++++  End Of Method Event untuk di modal select file dan modal tambah file asycn +++++++++++ ==================================================

$();


});
function open_modal_selectFile( btn_modal_selectFile ) {
	btn_modal_selectFile = $(btn_modal_selectFile);
	//Buat active .form_modal_file yang menjadi parent dari btn_modal_selectFile yang ditekan 
	// Hal ini dilakukan untuk memberikan tanda active jjadi ketika modal file submit, perubahan nilai file yang dipilih hanya yang form punya class active. 
	// Ini sangat penting ketika .form_modal_file lebih dari 1 dari setiap cycle
	var form_modal_file = $('.form_modal_file');
	var form_modal_file_target = btn_modal_selectFile.parents('.form_modal_file');
	//Hilangkan active .form_modal_file yang lainnya 
	form_modal_file.removeClass('active');

	//Berikan tanda active ke form_modal_file
	form_modal_file_target.addClass('active');

	var modal_select_file = $('#modal_select_file');
	modal_select_file.modal('show'); 
}

//+++++++++++ Fungsi untuk upload file asynchronous di modal select file dan modal tambah file async +++++++++++++++++++++++

function create_el_formModalFile( name_id_file =  "id_file", name_source_file = "source_file" ) {
	var el_form_modal_file =  `
	<!-- Form Row Yang Terintegrasi dengan modal select file asynchronous -->
	<div class="form_modal_file" style="width: 100%; padding: 20px;">
	<h5 class='mb-3'> File/Media Pendukung </h5>
	<button type="button" class="btn btn-primary btn_modal_selectFile" onclick="open_modal_selectFile(this)">
	Pilih File
	</button>
	<span id="nama_file" class="ml-3"> NONE </span>
	<!-- Input hidden yang akan ditambahkan pada jsnya -->
	<input required type="hidden" name="${ name_id_file }" id="id_file"> 
	<input required type="hidden" name="${ name_source_file }" id="source_file"> 
	</div>
	<!-- End Of Form Row Yang Terintegrasi dengan modal select file asynchronous -->
	`;

	return el_form_modal_file;
}
function el_form_file_upload() { 
	console.log("++++++ el_form_file_upload() +++++");
	//Akan menambahkan element berkaitan dengan semua modal file upload section ke setiap form yang menggunakan class .form_file_upload yang tidak punya class .not_upload
	//Jadi jika .form_file_upload punya class .not_upload, dia gak akan di tambahkan button untuk form file upload
	var form_file_upload = $('form').filter('.form_file_upload').not('.not_upload');
	var jumlah_form = form_file_upload.length;
	if ( jumlah_form > 0 ) {
		console.log("Ada menambahkan element form_modal_file ke form dengan class .form_file_upload dengan jumlah form " + jumlah_form )
		// Melakukan dan menambahkan mekanisme modal file lebih dari satu field di suatu form yang sama  dengan name yang harus di custom agar tidak terjadinya penumpukan data request dengan name yang sama. 
		// Jadi kalo ADA .field_upload_custom, maka ditambahkan form_modal_filenya di dalam element tersebut dengan name sesuai dengan atribut parammeter yang ditambahkan. Tapi jika tidak ada maka akan ditambahkan secara ddefault pada awal form
		/*
		Bentuk field_upload_custom yang benar 
		<div class='field_upload_custom' data-nama-idFile="" data-name-sourceFile=''></div>
		*/
		var field_upload_custom  = form_file_upload.find('.field_upload_custom');
		if ( field_upload_custom.length > 0 ) {
			// Jika field_upload_custom, maka ditambahkan form_modal_filenya di dalam element tersebut dengan name sesuai dengan atribut parammeter yang ditambahkan
			// Ambil name dari atriut form_upload_cutom	
			//Gunakan loop untuk mengatasi unique setiap element bukan dari selector class. Karena selector class hanya akan mengamil nilai dari selector element pertama saja 
			for (var i = 0; i < field_upload_custom.length; i++) {
				var field_upload_custom_i = field_upload_custom.eq( i );
				var data_name_idFile = field_upload_custom_i.attr('data-name-idFile');
				var data_name_sourceFile = field_upload_custom_i.attr('data-name-sourceFile');
				var el_form_modal_file =  create_el_formModalFile( data_name_idFile, data_name_sourceFile );

				//Menambahkan element .form_modal_file di masing masing .field_upload_custom dengan name input yang di custorm dan diambil dari atribut field_upload_custom
				field_upload_custom_i.prepend( el_form_modal_file );
			}
			console.log(`Ada .field_upload_custom dengan jumlah ${ field_upload_custom.length }, maka menambahkan form_modal_file tambahan atau custom di elemen tersebut pada form dengan name sesuai dengan parameter`);
		}else{
			// Jika field_upload_custom tidak ada, maka ditambahkan form_modal_filenya secara default di awal element formnya
			var el_form_modal_file =  create_el_formModalFile( 'id_file', 'source_file' );
			//Menambahkan form file upload secara defaut
			form_file_upload.prepend( el_form_modal_file );
			console.log('Tidak Ada .field_upload_custom, tidak bisa menambahkan form_moda_file tambahan atau custom di elemen tersebut pada form dan menambahkan form_modal_file secara default');
		}

	}else{
		console.log("Tidak menambahkan element form_modal_file ke form karena tidak ada form dengan class .form_file_upload dengan jumlah form " + jumlah_form );
	}


	console.log("++++++ end of el_form_file_upload() +++++");

}

function el_load_modalFileTambah( param, text_load = "Loading...." ) {
	var modal_tambahFile_async = $('#modal_tambahFile_async');
	var el_load_ajax = modal_tambahFile_async.find('.load_ajax_data');
	var el_text_caption = el_load_ajax.find('.text_caption');

	el_text_caption.html( text_load );

	if ( param == "show" ) {
		el_load_ajax.show();
	}else if ( param == "hide" ) {
		el_load_ajax.hide();
	}

}

function el_load_modalSelectFile( param, text_load = "Loading....") {
	var modal_select_file = $('#modal_select_file');
	var el_load_ajax = modal_select_file.find('.load_ajax_data');
	var el_text_caption = el_load_ajax.find('.text_caption');

	el_text_caption.html( text_load );

	if ( param == "show" ) {
		el_load_ajax.show();
	}else if ( param == "hide" ) {
		el_load_ajax.hide();
	}

}
function load_ajax_modalFileSelect() {
	

	load_data_kapasitas();

	//Melakukan load data file 
	var modal_select_file = $('#modal_select_file');
	var el_row_col_file = modal_select_file.find('.row_col_file');
	var el_file_empty = modal_select_file.find('.row.file_empty');

	//Dikosongin duls agar diisi dengan yang baru
	el_file_empty.hide();
	el_row_col_file.html("");

	//Munculin indicator load 
	el_load_modalSelectFile('show', "Fetch data.....");

	var data_param = {};
	if ( TIPE_PENYIMPANAN_PARAM != false ) {
		data_param = { by_tipe_penyimpanan : TIPE_PENYIMPANAN_PARAM };
	}

	//Melakukan request ke BE Modul File
	get_data( URL_API_FILE_LOKAL, data_param, function( response ) {

		var data_response = response; //Sudah dalam bentuk JSON

		//Hilangkan load animasi modal select file 
		el_load_modalSelectFile('hide', ":)");

		console.log( "Sesudah Parsing", data_response );

		// alert( data_response );
		if ( data_response != null && data_response.length > 0 ) {
			//Dikosongin duls agar diisi dengan yang baru
			el_file_empty.hide();
			el_row_col_file.html("");
			//Isi file data nya dengan data resonse yang dikembalikan
			for (var i = 0; i < data_response.length; i++) {
				var row_obj = data_response[i]
				create_el_file( row_obj );
			}
		}else{
			el_file_empty.show();
		}
	});
}


function getFileIconSrc( source_file ) {

	var FILE_ICON = {
		source_file : source_file,
		ext_file : false,
		src : false
	};

	//Buat icon file yanag tersedia di asset 
	var ext_file = source_file.split('.');
	var last_index = ext_file.length - 1;
	ext_file = ext_file[last_index];
	// Kecilkan nama filenya 
	ext_file = ext_file.toLowerCase();
	// // Daftar ekstensi dan ikon yang sesuai
	const data_icon = {
		"dokumen.png": OBJ_MEDIA.dokumen,
		"pdf.png": OBJ_MEDIA.pdf,
		"text.png": OBJ_MEDIA.text,
		"code.png": OBJ_MEDIA.code,
		"video.png": OBJ_MEDIA.video,
		"audio.png": OBJ_MEDIA.audio,
		"gambar.png": OBJ_MEDIA.img
	};
	var iconSrc = "none";
	Object.keys(data_icon).forEach(function(key_nama_file) {
		var row_icon = data_icon[key_nama_file];
		//Cari apakah existensi file yang di upload oleh user ada pada array setiap key. Kalo ada jadikan keynya tersebut sebagai src gambar icon. dan itu sudah ada di asset FEnya
		for (var i = 0; i < row_icon.length; i++) {
			var ext_file_db = row_icon[i];
			if ( ext_file === ext_file_db ) {
				iconSrc = key_nama_file;
				console.log( ext_file, ext_file_db );
				break; //Hentikan laju fungsi semuanya
			}
		}
	});

	FILE_ICON.src = URL_SERVICE_APP + "asset/gam/" + iconSrc;
	FILE_ICON.ext_file = ext_file;
	FILE_ICON.source_file = source_file;

	console.log( "+++++++++" );
	console.log( FILE_ICON );
	console.log( "+++++++++" );
	return FILE_ICON;
}
function create_el_file(row_obj) {
	var modal_select_file = $('#modal_select_file');
	var el_row_col_file = modal_select_file.find('.row_col_file');


	var id_file = row_obj.id_file;
	var nama_file = row_obj.nama_file;
	var source_file = row_obj.source_file;
	var tipe_penyimpanan = row_obj.tipe_penyimpanan;

	var ext_file; 
	/* Kalo eksistensinya berdasarkan tipe penyimpanan yang  ingin ditampilkan
	switch(tipe_penyimpanan){
		case "lokal":
		ext_file = source_file.split('.');
		var last_index = ext_file.length - 1;
		ext_file = ext_file[last_index];
		break;
		case "url":
		ext_file = "URL"
		break;
	}
	*/

	//Buat icon source gambar filenya berdasarkan eksistensi dari source filenya 
	var FILE_ICON = getFileIconSrc( source_file );
	var el_iconImg = '<img class="col_file_img" src="'+FILE_ICON.src+'">';
	//Size file 
	var size_file = row_obj.size_file_kb;
	//Buat dan Tambahkan ke elemen file di modal 
	var el_col_file = `
	<div class="col-sm-4 col_file" 
	data-idfile="${id_file}" 
	data-sourceFile="${FILE_ICON.source_file}" 
	data-namafile="${nama_file}" 
	onclick="col_file_click(this)">

	<div class="card" style="width: 100%;">
	<input type="radio">
	<div class="card-body">
	${el_iconImg}
	<p>${nama_file}</p>
	<p class="caption_file ext">
	.${FILE_ICON.ext_file}
	</p>
	<p class="caption_file size">
	${size_file} kb
	</p>
	</div>
	</div>
	</div>
	`;

	//TAMBAHKAN KE CONTAINER 
	el_row_col_file.append( el_col_file );
}
function col_file_click( obj ) {
	$('.col_file').removeClass('active');
	var radio = $('.col_file').find('input');
	var check = radio.prop('checked', false);


	var col_file_target = $(obj);
	col_file_target.addClass('active'); //sumber dari col_file_active 
	var radio = col_file_target.find('input');
	var check = radio.prop('checked', true);

}
function submit_select_file() {
	//Ketika file di pilih oleh user 
	// <input type="hidden" name="id_file" id="id_file">
	var modal_select_file =$('#modal_select_file');
	var col_file_active = $('.col_file').filter('.active');
	var data_idFile = col_file_active.attr('data-idfile');
	var data_sourceFile = col_file_active.attr('data-sourceFile');
	var data_namaFile = col_file_active.attr('data-namafile');

	modal_select_file.modal('hide');

	//Implementasi ke form rownya dari action modal yang .form_modal_file nya memiliki class .active dan ini harus strukturnya SESUAI
	var form_modal_file_active = $('.form_modal_file').filter('.active');	
	form_modal_file_active.find('#nama_file').text(data_namaFile);
	form_modal_file_active.find('#id_file').val(data_idFile);
	form_modal_file_active.find('#source_file').val(data_sourceFile);
}

function validasi_tipe_penyimpanan() {
	// Melakukan validasi tipe penyimpanan pada modal tambah file di input select dengan name tipe_penyimpanan

	var el_tipe_penyimpanan = $('select[name=tipe_penyimpanan]');
	if ( el_tipe_penyimpanan.length < 1 ) {
		return false;
	}
	var tipe_penyimpanan = el_tipe_penyimpanan.val();

	var input_tipe_select;
	switch( tipe_penyimpanan  ){
		case "lokal":
		input_tipe_select = $('input[name=upload_file]');
		break;
		case "cloud":
		input_tipe_select = $('input[name=upload_file]');
		break;
		case "url":
		input_tipe_select = $('input[name=url_file]');
		break;
	}

	var form_row_tipe = $('.form_row_tipe');
	form_row_tipe.find('*').hide();
	form_row_tipe.find('*').prop('disabled', true);

	input_tipe_select.show();
	input_tipe_select.prop('disabled', false);
}


function bar_indicator_implement( bar_indicator_el_selector, nilai_persentase ) {
	var bar_indicator_el = $( bar_indicator_el_selector );
	var bar_indicator = bar_indicator_el.find('.bar_indicator');
	bar_indicator.css({
		width : nilai_persentase + "%",
	});
}

function kbToMb(kb, decimals = 2) {
	return parseFloat((kb / 1000).toFixed(decimals));
}
function indicator_storage_implement( col_indicator_str_selector, storage_data ) {


	var col_indicator_str = $( col_indicator_str_selector );
	console.log('+++');
	console.log( storage_data );
	console.log( col_indicator_str.attr('id') );
	console.log('+++');


	//Ambil data kapasitas dan ubah ke MB 
	var kapasitas = kbToMb( parseFloat(storage_data.max));
	var kapasitas_terpakai = kbToMb(parseFloat( storage_data.terpakai ));

	var kapasitas_el = col_indicator_str.find('.kapasitas'); 
	var kapasitas_terpakai_el = col_indicator_str.find('.kapasitas_terpakai');
	kapasitas_el.html( kapasitas + "MB" );
	kapasitas_terpakai_el.html( kapasitas_terpakai  + "MB");

	//Implementasi bar indicator dengan persentase.
	var nilai_persentase = ( kapasitas_terpakai / kapasitas ) * 100; 
	bar_indicator_implement( col_indicator_str.find('.bar_indicator_el'), nilai_persentase );
}
function load_data_kapasitas() {
	get_API( URL_SERVICE_FILE + "file/get_data_kapasitas", {}, function( response ) {
		console.log("++++ KAPATASITAS TERPAKAI++++++++++++++");

		var lokal_data = response.lokal;
		indicator_storage_implement( '.col_indicator_str.lokal', lokal_data );

		var cloud_data = response.cloud;
		indicator_storage_implement( '.col_indicator_str.cloud', cloud_data );

	} );
}
//+++++++++++ End Of Fungsi untuk upload file asynchronous di modal select file dan modal tambah file async +++++++++++++++++++++++s

//+++++++++++ Fungsi terkait modal view file +++++++++++++++++++++++

function btn_modal_view( btn_modal_view ) {
	var data_href = btn_modal_view.attr('data-href');
	open_modal_view( data_href );
}
function open_modal_view( src ) {
	var modal_view_file = $('#modal_view_file');
	var caption_source = modal_view_file.find('#caption_source');
	var source_url = caption_source.find('.source_url');
	var btn_download = modal_view_file.find('.btn_download');
	modal_view_file.modal('show');
	source_url.text( src );
	btn_download.attr('data-href', src);
	setMedia( src );
}
function escapeHtml(unsafe) {
	return unsafe
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;")
	.replace(/"/g, "&quot;")
	.replace(/'/g, "&#039;");
}
function setMedia(src) {

	function loader_page_media( param_visible, text ) {
		var loader_view = $('.loader_view');
		loader_page(param_visible, loader_view, text);
	}

	loader_page_media('show', "Tunggu");

	console.log( "Membuka", src );
	var container_modal_view = $('.container_modal_view');
	container_modal_view.find("#img_view, #audio_view, #video_view, #pdf_view, #doc_view, #yt_view, #text_view, #code_view").hide();

	var img_view   = container_modal_view.find('#img_view');
	var video_view = container_modal_view.find('#video_view');
	var audio_view = container_modal_view.find('#audio_view');
	var pdf_view   = container_modal_view.find('#pdf_view');
	var doc_view   = container_modal_view.find('#doc_view');
	var yt_view    = container_modal_view.find('#yt_view');


	var text_view  = container_modal_view.find('#text_view');
	var text_view_content = text_view.find('pre');
	var code_view  = container_modal_view.find('#code_view');
	var code_view_content = code_view.find('code');

	// ==== YouTube ====
	if (src.includes("youtube.com/watch?v=") || src.includes("youtu.be/")) {
		let videoId = "";
		if (src.includes("youtube.com/watch?v=")) {
			videoId = new URL(src).searchParams.get("v");
		} else if (src.includes("youtu.be/")) {
			videoId = src.split("youtu.be/")[1].split("?")[0];
		}
		let embedUrl = "https://www.youtube.com/embed/" + videoId;
		yt_view.attr("src", embedUrl).show();
		loader_page_media('hide');

		return false; //Menghentikan laju fungsi
	}

	// ==== Midtrans Snap ====
	if (src.includes("app.sandbox.midtrans.com/snap/v4/redirection/") || src.includes("app.midtrans.com/snap/v4/redirection/")) {

		// bikin iframe khusus midtrans
		let midtrans_view = container_modal_view.find('#midtrans_view');

		midtrans_view.attr("src", src)
		midtrans_view.show();
		loader_page_media('hide');
		return false; // hentikan fungsi
	}

	// ==== Ekstensi file ====
	let ext = src.split(".").pop().toLowerCase();

	if (OBJ_MEDIA.img.includes(ext)) {
		img_view.attr("src", src).show();
		loader_page_media('hide');
	} 
	else if (OBJ_MEDIA.audio.includes(ext)) {
		audio_view.attr("src", src).show();
		loader_page_media('hide');
	} 
	else if (OBJ_MEDIA.video.includes(ext)) {
		video_view.attr("src", src).show();
		loader_page_media('hide');
	} 
	else if (OBJ_MEDIA.pdf.includes(ext)) {
		pdf_view.attr("src", src).show();
		loader_page_media('hide');
	}
	else if (OBJ_MEDIA.dokumen.includes(ext)) {
		// kasih param timestamp biar selalu fresh
		let gview = "https://docs.google.com/gview?url=" 
		+ encodeURIComponent(src) 
		+ "&embedded=true&cacheBust=" + new Date().getTime();

		// reset dulu biar iframe reload
		doc_view.attr("src", "");  

		setTimeout(function() {
			doc_view.attr("src", gview).show();
			loader_page_media('hide');
		}, 100); // kasih delay dikit biar refresh pasti jalan
	}
	// Plain text
	else if (OBJ_MEDIA.text.includes(ext)) {
		$.get(src, function(data) {
			// data = escapeHtml( data );
			text_view_content.text(data);
			text_view.show();
			loader_page_media('hide');	
		}).fail(function() {
			loader_page_media('show', "Gagal Memuat Teks");	
		});
	}
	// Code file
	else if (OBJ_MEDIA.code.includes(ext)) {
		$.get(src, function(data) {
			data = escapeHtml( data );
			code_view_content.html(data);
			code_view.show();
			loader_page_media('hide');	

		}).fail(function() {
			loader_page_media('show', "Gagal Memuat Kode");	
		});
	}
	else {
		loader_page_media('show', "Gagal Memuat Kode");	

	}
}


//+++++++++++ End Of Fungsi terkait modal view file +++++++++++++++++++++++



