
var nomor_wa = "62816268304";

$(document).ready(function(e) {



	//Event btn download 
	$('body').on('click', '.btn_download', function() {
		var btn_download = $(this);
		download_file(btn_download);
	});
	//Membuat nav header menjadi responsive widthnya
	sesuaikan_nav_header();	

	//Nav header toggle search
	$('.btn_toggle_search').on('click', function() {
		console.log("Toggle Search");
		var container_search = $('.container_search');
		if (container_search.is(':visible')) {
			container_search.hide();
		}else{
			container_search.show();
		}
	});


	//Event triger ketika nav menu header berada pada mode responsive
	$('.btn_menu_header').on('click', function(e) {
		var menu_header = $('.menu_header');
		var content_menu = menu_header.find('.content_menu');
		if ( content_menu.is(":visible") == true ) {
			//Jika sedang terbuka, maka tutup
			content_menu.hide();
		}else{
			content_menu.show();

		}
	});

	//Event berkaitan dengan sidebar
	$('.btn_sidebar').on('click', function(e) {
		sidebar_toggle();
	});
	$('.sidebar .btn_close').on('click', function(e) {
		sidebar_toggle();
	});

	//Ini untuk sidebar mini
	$('.nav_header .btn_sidebar').on('click', function() {
		var sidebar_mini = $('.sidebar_mini');
		sidebar_mini.show();
	});

	$('.sidebar_mini .btn_close').on('click', function() {
		var sidebar_mini = $('.sidebar_mini');
		sidebar_mini.hide();
	});



	//Event untuk link more pada .class .link_read 
	$('body').on('click', '.link_read' ,function(e) {
		var link_read = $(this);
		var box_deskripsi = link_read.parents('.box_deskripsi');
		var content = box_deskripsi.find('.content');
		if( content.is('.text_flow_multi3') ){
			//Jika deskripsi text singkat, atau ada text flow multi nya, maka tutup dan jadikan text pendek 
			link_read.text('Close');
			content.removeClass('text_flow_multi3');
		}else{
			//Jika deskripsi text panjang, atau tidaks ada text flow multi nya, maka buka dan jadikan text panjang 
			link_read.text('Read More');
			content.addClass('text_flow_multi3');
		}

	});



	// ======================== ADMIN FUNCTION ========================================
	$('body').on('click', 'table .btn_opt', function(e) {
		var btn_opt = $(this);
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
	});
	$('body').on('click', '.menu_opt .close_opt', function(e) {

		var close_opt = $(this);
		var menu_opt = close_opt.parents('.menu_opt');
		menu_opt_hide( menu_opt );
	});




	// ++++++++++++++++++++++++++++ Panel User Events ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	$('.content_search .col_search').on('click', function(e) {
		var col_search =$(this);
		var content_search = col_search.parents('.content_search');
		var btn_closeSearch = content_search.find('.btn_closeSearch');
		btn_closeSearch.show();
		if ( content_search.hasClass('active') == false ) {
			//Jika dia sedang tidak sedang aktif, maka aktifkan
			content_search.addClass('active');
			$('html').bind('click', function(e) {
				var target_click = $(e.target);
				if ( target_click.is('.col_search *') == false ) {
					// Jika yang di klik buka input, maka tutup content search
					close_search();
				}
			});
		}

	});
	$('.btn_closeSearch').on('click', function(e) {
		close_search();
	});

	// Modal pop up untuk setiap produk
	$('.btn_popup_info').on('click', function(e) {
		var btn_popup_info = $(this);
		var card_data = btn_popup_info.parents('.card_data');
		var popUp_info_target = card_data.find('.popUp_info');

		//Tutup atau nonaktifkan semua popup_info yang sedang aktif 
		close_popUpInfo();
		popUp_info_target.addClass('active');
	});
	$('.btn_close_popup, .backdrop').on('click', function(e) {
		close_popUpInfo();
	});

	// Indicator nilai stok yang dipesan setiap item produk
	$('.indicator_box').find('button').on('click', function(e) {
		// Perhatikan untuk setiap id pada button di indicator box tidak boleh diubah ubah agar aevent js tidak error
		var btn_indicator_qty = $(this);
		var indicator_box = btn_indicator_qty.parents('.indicator_box');
		var id_btn = btn_indicator_qty.attr('id');
		var input_qty = indicator_box.find('input');
		var nilai_qty = input_qty.val();


		// Setiap id button tersebut punya fungsinya yang berbeda
		//Jadi setiap button di klik akan dilakukan proses increment ( btn_plus_indicator ) atau proses decrement ( btn_minus_indicator ) terhadap nilai input sesuai dengan jenis id button tersebut
		if (  id_btn == "btn_plus_indicator" ) {
			nilai_qty++;
		}else if ( id_btn == "btn_minus_indicator" ) {
			// Berikan batasan agar nilainya qty yang dipesan tidak boleh nol atau kurang dari nol. Jadi jika btn minus di pencet dan pesanan ada di 1, maka tidak bisa decrement dan di update nilainya, karena nanti hasilnya jadi nol atau kurang dari nol dan itu gak boleh.
			if ( nilai_qty <= 1 ) {
				console.log('Pesanan gak boleh 0 atau minus!');
				return false;
			}
			nilai_qty--;
		}

		//Update ke input
		input_qty.val( nilai_qty );

	})
	// Disable input untuk yang ada di dalam indicator box, agar user tidak bisa mengotak ngatik
	var indicator_box = $('.indicator_box');
	var input_qty = indicator_box.find('input');
	input_qty.prop('readonly', true);



	// +++++++++++++++++++++++++++ Landing Event ++++++++

	// Untuk section tap slide pada landing page
	$('.indicator_col').on('click', function(e) {
		// Agar script ini bisa bekerja untuk lebih dari section dengan konsep yang sama dan tidak akan tertukar
		var indicator_col_target = $(this);//Yang barusan dipilih
		var section_slide = indicator_col_target.parents('.section_slide');
		var indicator_col_active = section_slide.find('.indicator_col').filter('.active');

		indicator_col_target.addClass('active');
		indicator_col_active.removeClass('active');


		var data_idTarget_slide = indicator_col_target.attr('data-idTarget-slide');
		var id_target = "#" + data_idTarget_slide;
		var my_slide = section_slide.find('.my_slide');
		var my_slide_active = my_slide.filter('.active');
		var my_slide_target = my_slide.filter(id_target);


		//Menghilangkan semua slide 
		my_slide.hide();
		my_slide.removeClass('active');
		my_slide_target.show('slide');
		my_slide_target.addClass('active');

		return false;
	});
	//Mengklik indicator section slide dengan index awal di semua section slide agar slide pertama muncul
	var section_slide = $('.section_slide');
	for (var i = 0; i < section_slide.length; i++) {
		var section_slide_target = section_slide.eq(i);
		var indicator_first = section_slide_target.find('.indicator_col').first();
		indicator_first.click();
	}

	// Ketika data_jenis_fitur sudah diklik berdasarkan data relasi 
	$('.row_menu_fitur.data_jenis_fitur').on('click', function(e) {
		var row_menu_jenisFitur = $(this);
		var data_idJenis_fitur = row_menu_jenisFitur.attr('data-idJenis-fitur');
		var content_menu = row_menu_jenisFitur.parents('.content_menu');
		var content_section_target = content_menu.find('.content_section.data_jenis_fitur').filter( "#" + data_idJenis_fitur );

		// Tutup semua yang sedang aktif, rowm_menu_fitur dan content_section
		hide_contentSection(
			content_menu.find('.row_menu_fitur.data_jenis_fitur'),
			content_menu.find('.content_section.data_jenis_fitur')
			);

		// Buat semua aktif untuk row_menu_fitur dan content_section
		row_menu_jenisFitur.addClass('active');
		content_section_target.addClass('active');

	});
	//Jika param mobile tidak muncul dan di tampilan web
	// Note : jika kita pake visible gfak akan bener, karena walupun di tampilan mobile param mobile sudah menjadi display block, tapi akan tetap visiblenya false atau dianggap hilang. Karena parentnya dia itu secara default memang hilang.
	// Maka dari itu kita pake nilai dengan properti display untuk jadikan parameter nilai kondisi
	if ( $('.param_mobile').css('display') == "none" ) {
		//Jika berada di tampilan web
		open_first_contentSection();
	}

	// Untuk faq
	$('.header_faq').on('click', function(e) {
		var header_faq = $(this);
		var box_faq_target = header_faq.parents('.box_faq');

		//Jika box_faq yang dipilih itu tadinya sudah buka atau aktif, maka tutup yang box_faq yang dipilih saja.
		if ( box_faq_target.filter('.active').length > 0 ) {
			box_faq_target.removeClass('active');
			return false; //Menghentikan laju fungsi
		}

		//Hilangkan aktif di semua box_faq 
		$('.box_faq').removeClass('active');

		//Jadikan box_faq_target jadi aktif
		box_faq_target.addClass('active', 'blind');
	});


	//Progress animasi untuk card course 
	var progress = $('.progress');
	for (var i = 0; i < progress.length; i++) {
		let obj_progress = progress.eq(i);
		progress_implementasi( obj_progress );
	}


	//======================================== END OF EVENT UNTUK HALAMAN LANDING =====================
	$('#form_daftar_course').on('submit', function (e) {
		e.preventDefault(); // Cegah form submit biasa

		// Ambil data satu per satu
		const nama = $('input[name="nama"]').val();
		const jenisKelamin = $('select[name="jenis_kelamin"]').val();
		const umur = $('input[name="umur"]').val();
		const tingkatan = $('select[name="tingkatan"]').val();
		const course = $('select[name="course"]').val();
		const alamat = $('textarea[name="alamat"]').val();
		const waliMurid = $('input[name="wali_murid"]').val();
		const nomor_wali = $('input[name="nomor_wali"]').val();

		// Susun isi pesan
		const pesan = 
		`Hi min, saya ingin daftar course dengan data : 
		- Nama: ${nama} 
		- Jenis Kelamin: ${jenisKelamin} 
		- Umur: ${umur} 
		- Tingkatan Pendidikan: ${tingkatan} 
		- Pilihan Course: ${course} 
		- Alamat: ${alamat} 
		- Nama Wali Murid: ${waliMurid} 
		- Nomor Wali: ${nomor_wali}`.replace(/^\s+/gm, '').trim();

		direct_sendWA( nomor_wa, pesan );
	});
	$('#form_konsul').on('submit', function (e) {
		e.preventDefault(); // Cegah form submit biasa

		// Ambil data satu per satu
		// Ambil data satu per satu
		const nama = $('input[name="nama"]').val();
		const jenisKelamin = $('select[name="jenis_kelamin"]').val();
		const umur = $('input[name="umur"]').val();
		const tingkatan = $('select[name="tingkatan"]').val();
		const alamat = $('textarea[name="alamat"]').val();
		const waliMurid = $('input[name="wali_murid"]').val();
		const nomor_wali = $('input[name="nomor_wali"]').val();
		const msg_konsul = $('textarea[name="msg_konsul"]').val();

		// Susun isi pesan
		const pesan = 
		`Hi min, saya ingin konsul donk : 
		- Nama: ${nama} 
		- Jenis Kelamin: ${jenisKelamin} 
		- Umur: ${umur} Tahun 
		- Tingkatan Pendidikan: ${tingkatan} 
		- Alamat: ${alamat} 
		- Nama Wali Murid: ${waliMurid} 
		++++++++++++ PESAN KONSUL ++++++++++++++++++
		${msg_konsul}`.replace(/^\s+/gm, '').trim();

		direct_sendWA( nomor_wa, pesan );
	});

	//======================================== END OF EVENT UNTUK HALAMAN LANDING =====================



})
function download_file( btn_download ) {
	var data_href = btn_download.attr('data-href');
	downloadFile( data_href );
}
function downloadFile(url, fileName) {
	// kalau filename tidak ada, ambil dari URL
	if (!fileName) {
		const urlObj = new URL(url, window.location.href); // handle relative URL juga
		fileName = urlObj.pathname.split("/").pop() || "download";
	}

	const link = document.createElement("a");
	link.href = url;
	link.download = "CERTARA-" + fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
function sesuaikan_nav_header() {
	nav_header = $('.nav_header').not('.not_inherit_sidebar');
	var parent_patokan = nav_header.parents('.content');
	var lebar_parent = parent_patokan.css('width');
	nav_header.css('width', lebar_parent);
}
function menu_opt_hide( menu_opt ) {
	menu_opt.hide();
	$('html').unbind('click');
}
function sidebar_toggle() {
	var sidebar = $('.col_sidebar');
	if ( sidebar.is(':visible') == false ) {
		//Jika sidebar lagi tertutup, maka munculkan
		sidebar_show( sidebar );
	}else{
		//Jika sidebar lagi terbuka, maka tertutup
		sidebar_hide( sidebar );

	}

	//Jalankan toggle untuk element responsive content pada nav header
	responsive_content_toggle( sidebar );
}

function sidebar_show( sidebar ) {



	sidebar.show( function() {

		//Fungsi callback akan menjalankan suatu perintah ke DOM elemen html. Jika html itu di klik dan target klliknya adalah bukan sidebar itu sendiri, maka sidebarnya akan tertutup. Dan callback DOM elemen html itu akan berjalan ketika aplikasi berada di mode mobile dengan acuan jika berada di mobile maka sidebar punya css position nilainya fixed 
		// Efek binding untuk trigger sidebar ketika klik bukan elemen sidebar hanya berlaku ketika sidebar ini berada di mode responsie mobile, ditandai dengan nilai positionnya yaitu "fixed"
		if ( sidebar.css('position') == "fixed"  ) {
			console.log("Berada pada mode mobile, maka trigger sukses jalan!");
			//Jika berada pada mode responsive mobile, maka jalankan triger binding html
			$('html').bind('click', function(e) {
				var target = $(e.target);
				var obj_is_sidebar = target.is( sidebar ) || target.is( sidebar.find('*') ); //Jika object yang di klik adalah sidebar atau anaknya, maka akan menghasilkan true, tapi jika bukan maka akan menghasilkan false
				//Jika yang di klik merupakan bukan object sidebar atau childnya, maka tutupnya 
				if ( obj_is_sidebar == false ) {
					sidebar_hide( sidebar );	
				}
			});

		}else{
			console.log("Bukan berada pada mode mobile, maka trigger tidak jalan!");

		}

		sesuaikan_nav_header();
	});
}
function sidebar_hide( sidebar ) {
	sidebar.hide();
	$( 'html' ).unbind('click');//Hilangkan event html yang terdaftar agar tidak konflik
	sesuaikan_nav_header();

}

// Fungsi berfungsi untuk menjadi toggle untuk elemen .responsive_content pada .nav_header. 
//Jadi ketika sidebar show maka .responsive_content akan hilang, tai ketika sidebar hide maka .responsive_content akan muncul 
function responsive_content_toggle( sidebar ) {			
	var responsive_content_toggle = $('.nav_header .responsive_content');
	if ( sidebar.is(':visible') ) {
		//Ketika sidebar muncul, maka toggle hilang
		responsive_content_toggle.hide();
	}else{
		//Ketika sidebar hilang, maka toggle muncul
		//Tidak menggunakan hide, karena display yang digunakan adalah flex untuk munculnya
		responsive_content_toggle.css('display', 'flex');
	}


}




function close_popUpInfo() {
	$('.popUp_info').removeClass('active');
}

function close_search() {
	$('.content_search').removeClass('active');
	$('html').unbind('click');
	$('.btn_closeSearch').hide();
}


function upload_file(obj, dataFile, callback ) {
	var inputUpload = $(obj);
	//Methode untuk mengambil dan membuat link source file 
	var file = dataFile.target.files[0]; 
	var fileName = file.name; // Mengambil nama file
	var fileSrc = URL.createObjectURL(file);
	//Menampilkan gambar di frame elemen dan hilangkan efek border

	/*Jadi pada fungsi call back ini, 
	argument 1 adalah nilainya string berupa nama file
	argument 2 adalah nilainya string beerupa url file 
	*/
	callback( fileName, fileSrc );

	console.log("Nama file:", fileName); // Menampilkan nama file di konsol
}


function progress_implementasi(obj_progress) {
	var val_progress = obj_progress.attr('data-progress');
	var bg_bar = "none";
	if ( val_progress >= 80  ) {
		bg_bar = "limegreen";
	}else if ( val_progress < 80 && val_progress >= 50  ) {
		bg_bar = "gold"
	}else if ( val_progress < 50 ) {
		bg_bar = "brown";
	}

	//Implementasi ke isi
	var satuan = "%";
	var el_bar = obj_progress.find('.bar');
	var el_value = obj_progress.find('.value');

	var progress_update = val_progress + satuan;  
	el_bar.css('width', progress_update);
	el_bar.css('background-color', bg_bar);
	el_value.text( progress_update );

}


function direct_sendWA(nomor_wa, pesan) {
	// Encode pesan agar aman digunakan di URL
	const pesanEncoded = encodeURIComponent(pesan);

	// Buat URL WA
	const url = `https://wa.me/${nomor_wa}?text=${pesanEncoded}`;

	// Redirect ke URL
	window.location.href = url;
}

