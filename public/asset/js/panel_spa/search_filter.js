//Script ini terhubung dengan admin.js yang menjadi base file script untuk fungsi fungsio terkait
$(document).ready(function() {

	//Search fitur dan filter 
	$('body').on('submit', '#form_search, .form_filter', function(e) {
		e.preventDefault();
		load_table_search_filter();
	});

});
// Melakukan load table pada section_content yang sedang aktif berdasarkan data-fungsi 
function load_table_search_filter() {	
	//Event ini akan membuat fungsi load yang di ambil dari data-fungsi dan fungsinya yang sudah dibuat 
	//Contoh melakukan load di section_content dengan data-fungsi "course" dan maka course tersebut dijadikan string load_content_course dan dijadikan fungsi kemudian dijalankan. Fungsi load_content_course itu sudah ada sebelumnya
	//data-fungsi menjadi path endpoint
	var section_content = $('.section_content');
	var data_fungsi = section_content.attr('data-fungsi');
	//Hasil yang diharapkan {url_service_ci}/{data_fungsi}
	var URL_ENDPOINT = URL_SERVICE_CI + data_fungsi;
	var animasi_loadPageEl = section_content.find('.animasi_loadPage');
	animasi_loadPage('show', animasi_loadPageEl, "Memuat data table...." );

	//+++++ Ambil nilai Form Search Input
	var form_search = section_content.find('#form_search');
	var search_input = form_search.find('[name=search_keyword]').val();

	//++++++ Ambil dan siapkan nilai filter
	var filter_keyword;
	var filter_input = {};//INI COMING SOON YAA 

	//== Filter status
	var form_filter_status = $('#form_filter_status');
	var filter_keyword = form_filter_status.find('[name=filter_keyword]').val();	
	filter_input.status = filter_keyword;
		

	//Request Data Search And Filter
	get_search_filter( URL_ENDPOINT,  search_input, filter_input, function( response )  {
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