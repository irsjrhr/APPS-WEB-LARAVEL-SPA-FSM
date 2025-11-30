//Script TERHUBUNGAN DENGAN FUNGSI PADA api.js untuk melakukan request data dan admin_table.js untuk melakukan load DOM table terkait data yang di load
//Di script ini semuanya berhubungan dengan data di URL_SERVICE_CI

var LOAD_PAGE_URL;
$(document).ready(function() {
	// ======================== ADMIN EVENT TRIGER ========================================
	
	$('body').on('click', '.btn_opt', function(e) {
		btn_opt_toggle( $(this) );
	});
	$('body').on('click', '.menu_opt .close_opt', function(e) {

		var close_opt = $(this);
		var menu_opt = close_opt.parents('.menu_opt');
		menu_opt_hide( menu_opt );
	});
	$('body').on('click', '.btn_video', function(e) {
		var btn = $(this);
		var data_url = btn.attr('data-url'); //Ambil data source video dari button
		var modal_video = $('#modal_video');
		var video = modal_video.find('video');
		var video_src = video.find('source');

		//Update src
		video_src.attr('src',  data_url );
		//Muat ulamg DOM Videonya dengan source terbaru
		video[0].load();

	});	
	//++++++++++ Asynchronous ++++++++++++++++
	$('.sidebar .link_menu').on('click', function() {
		var link_menu = $('.sidebar .link_menu');
		var link_menu_target = $(this);
		var data_page = link_menu_target.attr('data-page');

		load_page( data_page );
	});

	//Buka page pertama dashboard untuk setiap SPA
	var link_menu_first = $('.sidebar').find('.link_menu').first();
	var data_page = link_menu_first.attr('data-page');
	load_page( data_page );
	// setTimeout(function() {// 	$('#modal_tambah').modal('show');// },100);

	//Event .btn_load untuk melakukan load data ke tabel yang ada di main_container pada page yang sedang aktif atau dimuat
	$('.main_container').on('click', '.btn_load', function() {
		// Melakukan load table pada section_content yang sedang aktif berdasarkan data-fungsi 
		load_table_active();
	});


	// Menambahkan data secara asynchronous
	$('.main_container').on('submit', '#modal_tambah form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form

		var form = $(this);
		var form_data = form.serialize();
		var action = form.attr('action');
		post_dataForm( action, form_data, function( response ) {
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			//Refresh data di table load 
			load_table_active();
		} );
	});

});


function btn_opt_toggle( obj ) {
	var btn_opt = $( obj );
	var td = btn_opt.parents('td');
	var menu_opt = td.find('.menu_opt');
	menu_opt.show( function() {
		$('html').bind('click', function(e) {
			var target = $(e.target);
			var obj_is_menu = target.is('.menu_opt');
			if ( obj_is_menu == false ) {
				//Jika yang di klik bukan area dalam menu yang sedang di buka, maka tutup menu ini 
				menu_opt_hide( menu_opt );

			}
		});				
	});
}
function menu_opt_hide( menu_opt ) {
	menu_opt.hide();
	$('html').unbind('click');
}


// +++++++++++ Asynchronous Method 
function animasi_loadPage( param = "show", animasi_loadPageElInput = "", text_load = "Memuat data ....", callback = false ) {

	console.log("Animasi load page", param);
	var animasi_loadPageEl = $(animasi_loadPageElInput);
	//Melakukan perubahan pada text load animasi 
	var text_loadEl = animasi_loadPageEl.find('.text_load');
	text_loadEl.html(text_load);

	//Menentukan hilang atau muncul
	switch( param ){
		case "show" :
		animasi_loadPageEl.show();
		break;

		case 'hide' :
		setTimeout(function() {
			animasi_loadPageEl.hide();
		}, 100);
		break;
	}
	if ( animasi_loadPageEl.length < 1 ) {
		console.log( "Tidak ada object animasi_loadPage dengan class", animasi_loadPageEl);
	}


	//Handling error arg untuk bentuk callback
	if ( callback == false ) {
		//buat menjadi fungsi kosong 
		callback = function( s ) {
			return false;
		} 
	}
	callback( animasi_loadPageEl );
}
function create_animasiLoadPageEl() {
	//Ambil element yang sudah pernah ada di col content utama
	var col_content = $('.col.content');
	var animasi_loadPageEl = col_content.find('.animasi_loadPage').html();
	//Buat yang baru 
	var new_animasi_loadPage = `
	<!-- Elemen ini ditambahkan oleh fungsi create_animasiLoadPageEl() pada saat load page berlangsung dan berhasil -->
	<div class='animasi_loadPage'>
	${ animasi_loadPageEl } </div>
	<!-- Elemen ini ditambahkan oleh fungsi create_animasiLoadPageEl() pada saat load page berlangsung dan berhasil -->
	`;
	//Tambahkan ke section content di page yang di load atau yang sedang aktif pada div parent table_data
	var table_data = $('.table_data');
	var parent_table = table_data.parent('div');
	parent_table.prepend( new_animasi_loadPage );

}
function load_page( target_page = BASE_URL_PAGE ) {

	//SET DEBUG URL ACTIVE
	LOAD_PAGE_URL = target_page; 

	//Melakukan load page secara asynchrnous yang saling terhubung dengan menu sidebarnya dengan element root utama parentnya adalah .main_container
	// Jadi page akan di load() ke dalam element parent .main_container
	//Link menu target yang dijadikan active di pilih dari link menu yang memiliki data-page seperti target_page
	// Target_page berisi nilai dari url atau alamat halaman yang akan dimuat. 
	//  pada element link_menu data-page tersebut nilainya akan diisi langsung dari view atau seperti alamatnya 

	//+++++ Lakukan load section_content untuk halaman yang dituju sesuai dengan metad data link
	//Mengilangkan konten didalam main_container yaitu juga menghilangkan section_content yang lama
	var main_container = $('.main_container');
	main_container.html();
	//Melakukan load pada halaman baru yaitu juga menambahkan section_content yang baru pada halaman tersebut
	var animasi_loadPageEl = $('.col.content').find('.animasi_loadPage'); 
	animasi_loadPage("show", animasi_loadPageEl );
	console.log( "Target page", target_page );
	main_container.load( target_page, function(responseText, statusText, xhr) {

		if ( statusText === "error") {
			console.log( xhr );
			//Jika page tidak dapat di load atau error 	
			var msg = `${ xhr.status } <br> ${xhr.statusText}`
			animasi_loadPage('show', animasi_loadPageEl, msg);
			return false; //Menghentikan laju fungsi
		}
		//Ini letaknya ada di file.js untuk menambahkan elemen untuk melakukan select file
		//Mengecek dan menambahkan tombol untuk memanggil modal select file apabila ada elemen form yang memiliki class .form_file_upload 
		el_form_file_upload();  
		animasi_loadPage("hide", animasi_loadPageEl);

		//Menambahan element animasi load page pada table
		create_animasiLoadPageEl();

		//Membuat list select level pada halaman Admin/account di modal form berdasarkan data api
		get_data( URL_SERVICE_CI + "level", {}, function( response ) {
			var select_level = $('select[name=level]');
			for (var i = 0; i < response.length; i++) {
				var row_level = response[i];
				var nama_level = row_level.nama_level;
				var option_el = `<option value='${nama_level}'>${nama_level}</option>`;
				select_level.append( option_el );
			}
		});

		//Membuat list select kategori transaksi pada halaman Admin/transaksi di modal form berdasarkan data api
		get_data( URL_SERVICE_CI + "transaksi_kategori", {}, function( response ) {
			var select_level = $('select[name=id_transaksi_kategori]');
			for (var i = 0; i < response.length; i++) {
				var row_transaksi_kategori = response[i];
				var id_transaksi_kategori = row_transaksi_kategori.id_transaksi_kategori;
				var nama_transaksi_kategori = row_transaksi_kategori.nama_transaksi_kategori;
				var option_el = `<option value='${id_transaksi_kategori}'>${nama_transaksi_kategori}</option>`;
				select_level.append( option_el );
			}
		});

		//Kalo ada monitoring maps 
		maps_update();


	});


	//++++++++++ Memberikan tanda efek ke .link_menu yang punya nilai data-page seperti target_page
	var link_menu = $('.sidebar .link_menu');
	var link_menu_target = link_menu.filter(`.link_menu[data-page="${target_page}"]`);
	//+++++ Tandai elemen link menu yang aktif 
	link_menu.removeClass('active');
	link_menu_target.addClass('active');


	console.log("+++ Melakukan load page async", target_page);
}


// +++++++++++++++++ Fungsi Untuk Melakukan Load Data Ke Table Berdasarkan data-fungsi yang ada pada section_content ++++++++++++++

// Melakukan load table pada section_content yang sedang aktif berdasarkan data-fungsi 
function load_table_active() {	
	//Event ini akan membuat fungsi load yang di ambil dari data-fungsi dan fungsinya yang sudah dibuat 
	//Contoh melakukan load di section_content dengan data-fungsi "course" dan maka course tersebut dijadikan string load_content_course dan dijadikan fungsi kemudian dijalankan. Fungsi load_content_course itu sudah ada sebelumnya
	//data-fungsi menjadi path endpoint
	var section_content = $('.section_content');
	var data_fungsi = section_content.attr('data-fungsi');
	//Hasil yang diharapkan {url_service_ci}/{data_fungsi}
	var URL_ENDPOINT = URL_SERVICE_CI + data_fungsi;
	var animasi_loadPageEl = section_content.find('.animasi_loadPage');
	animasi_loadPage('show', animasi_loadPageEl, "Memuat data table...." );
	//Menjalankan fungsi get_data( enpoint, callback ) yang ada pada api.js
	get_data( URL_ENDPOINT, {}, function( response ) {

		console.log(response);
		//Jika request berhasil
		if ( response != null ) {
			var data_load = response;
			load_table( data_load );
			animasi_loadPage('hide', animasi_loadPageEl);
		}else{
			animasi_loadPage('show', animasi_loadPageEl, "Data tidak ditemukan!");
		}

	});
}

//Melakukan load tabel data yang mengintegrasikannya pada fungsi di admin_table.js dengan closure berdasarkan data yang dikirimkan pada argument 
function load_table( data = [] ) {
	// Bentuk argument data nya adalah array index multidimensi yang isinya object 
	//Ini adalah konsep closure interopobility
	//Merupakan fungsi untuk melakukan load data ke suatu table pada section_content (berdasarkan data-fungsi) yang sedang di buka berdasarkan data yang di kirim pada argument
	//Data yang di kirim ke argument adalah array index yang isinya array associatif atau object 
	//Function yang di panggil itu ada di admin_table.js dengan format fungsinya adalah load_table_[data-fungsi]()
	//Dan yang terjadi adalah fungsi yang di panggil akan melakukan load data ( dari data yang di kirim dari argumen ) ke dalam table pada section_content yag sedang dibuka berdasarkan data-fungsinya tadi. Load data ke tabel ini melibatkan proses manipulasi DOM agar terdapat strukut data yang sesuai 
	// Jadi bisa dikatakan setiap page fitur asynchronous yang di buat pada admin yang memiliki struktur halaman data tabel, maka  punya fungsi load data DOM di admin_table.js 
	var section_content = $('.section_content'); // Memilih object .section_content yang sedang terbuka 
	
	var banyak_data = section_content.find('.banyak_data');

	banyak_data.text( data.length );

	var data_fungsi = section_content.attr('data-fungsi'); //Mengambil data-fungsi untuk pembuatan dan pemanggilan fungsi load table pada admin_table.js untuk memuat data pada table. Jadi isi pada data-fungsi pada setiap section_content itu terhubung atau memiliki bentuk dengan nama fungsi tersebut di admin_table.js
	var nama_fungsi = "load_table_" + data_fungsi;
	let func = new Function("data", `
		return ${nama_fungsi}( data );` //Pembuatan fungsi 
		); //Closure interopablity 


	//++++++++++++++++++
	func( data );// Fungsi untuk load table, dengan perilaku loadnya ada di admin_table.js
	//++++++++++++++++++

	console.log("+++ Menjalankan fungsi load", nama_fungsi, "dengan data yang di load ke content adalah", data );
}

function open_modal_pembayaran( src ) {
	function loader_pembayaran( param_visible = "hide", caption = "...."  ) {
		var loader_pembayaran = $('.loader_pembayaran');
		loader_page( param_visible, loader_pembayaran, caption );
	}
	var modal_pembayaran = $('#modal_pembayaran');
	var caption_source = modal_pembayaran.find('#caption_source');
	var source_url = caption_source.find('.source_url');
	var container_modal_view = modal_pembayaran.find('.container_modal_view');
	var btn_download = modal_pembayaran.find('.btn_download');
	var midtrans_view = container_modal_view.find('#midtrans_view');
	modal_pembayaran.modal('show');
	source_url.text( src );
	btn_download.attr('data-href', src);
	loader_pembayaran('show', 'Harap Tunggu.....');

	//MENAMPILKAN IFRAME DALAM IFRAME AGARR TIDAK TERKENA EFEK REDIRECT DARI MIDTRANS CALLBACK
	// Jadi Di Modal kita melakukan iframe ke method route admin/embed_midtrans/{url}. Kemudian di method tersebut dia akan melakukan iframe lagi dengan halaman full daari url yang kita passing pada parameter routenya 
	// src = BASE_URL_PAGE +'admin/embed_midtrans/'+src ;
	// ==== Midtrans Iframe Snap ==== 
	midtrans_view.attr("src", src);
	loader_pembayaran('hide');
}







