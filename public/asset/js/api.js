// UNTUK URL APP BE TERKAIT SERVICE BE BISNIS 

const BASE_URL_PAGE = "http://127.0.0.1:8000/"; 

// ++++++++++++ CONSTANT REQUEST API SERVICE ++++++++
// UNTUK URL APP BE TERKAIT SERVICE BE DENGAN CI
// const URL_SERVICE_CI = "https://app.certara.id/";
const URL_SERVICE_CI = "http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_ci/";
// UNTUK URL APP BE TERKAIT SERVICE BE DENGAN LARAVEL
const URL_SERVICE_LARAVEL = "http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_laravel/";
// UNTUK URL APP BE TERKAIT SERVICE BE FILE
const URL_SERVICE_FILE = "http://localhost/My_Script/SCRIPT_PROJECT/client_product/Konsep_OOP/APP_BASE_CI_3/APP_FSM_WAFA/service_file/";

// ++++++++++++ CONSTANT REQUEST API SERVICE ++++++++

//Loaader Page
function loader_page( param_visible = 'show', selector_loader_page = null, caption = "Certara - Learning Management System") {
	//Selector loader page bisa diisi dengan class ataupun id

	var el_loader_page = $('.loader_page');
	if ( selector_loader_page == null ) {
		//Jika id_loader null, maka dia memilih loader yang ada di header
		el_loader_page = el_loader_page.eq(0);
	}else{
		//Jika id_loader tidak null, maka dia memilih loader berdasarkan idnya 
		el_loader_page = el_loader_page.filter(selector_loader_page );
	}

	el_loader_page.html(" ");
	el_loader_page.append(`<div class="content">
		<div class="load_animasi"></div>
		<p class="caption"> ${ caption } </p>
		</div>`);

	if ( param_visible == "show" ) {
		el_loader_page.addClass('active');
	}else if ( param_visible == "hide") {
		el_loader_page.removeClass('active');

	}

	var el_caption = el_loader_page.find('.caption');
	el_caption.html( caption );
}
//Mengubah dari bentuk object ke bentuk json encrypt 
function cv_obj_json( obj ) {
	// Ubah object ke json
	return encodeURIComponent(JSON.stringify(obj));
}
//Mengubah dari bentuk json yang di encrypt ke bntuk object 
function cv_json_obj(json) {
	// Ubah json ke obj
	return JSON.parse(decodeURIComponent( json ))
}


//Mengambil dari local storage yang ditetapkan pada saat autentikasi 
var DATA_AUTH = {
	user_login : localStorage.getItem('user_login'),
	level_login : localStorage.getItem('level_login'),
	source_file_profile : localStorage.getItem('source_file_profile'),
}

$(function() {
	$('.box_profile').find('.info_user').text( DATA_AUTH.user_login );
	$('.box_profile').find('.info_role').text( DATA_AUTH.level_login );
	$('.box_profile').find('.img_profile').attr('src', DATA_AUTH.source_file_profile );
});
function direct_set_sesi() {
	//Ini bisa berjalan hanya ketika user sudah login 
	var user_login = DATA_AUTH.user_login;
	var level_login = DATA_AUTH.level_login;
	var source_file_profile = DATA_AUTH.source_file_profile;
	var url = `${ BASE_URL_PAGE}Auth/set_sesi?user=${user_login}&level=${level_login}&source_file_profile=${source_file_profile}`;
	window.location.href = url;

}
//Mengambil user yang sedang login 
function get_userLogin() {
	//Ini diambil dari local storage login user 
	return DATA_AUTH.user_login;
}
//Fungsi ketika mengambil 1 data
//Contoh : https://url_service/endpoint_service/get_data
function get_row( url_endpoint = "URL_SERVICE/endpoint_service", data_param = {}, callback ) {


	/*
	=> data_param adalah parameter get pada url, contoh : ?key=nilai
	=> CONTOH RESPONSE
	- KALO DATA ADA ---> {} bentuk object
	- KALO DATA GAK ADA ----> bentuk null
	*/
	
	//Contoh : https://url_service/course/get_data
	url_endpoint += "/get_row";		
	get_API(  url_endpoint, data_param, callback );
}

//Fungsi ketika mengambil banyak data
//Contoh : https://url_service/endpoint_service/get_data
//Contoh Endpoint akhir : https://url_service/course/get_data?key_data_param={nilai}
function get_data( url_endpoint = "https://URL_SERVICE/endpoint_service", data_param = {}, callback ) {
	/*
	=> data_param adalah parameter get pada url, contoh : ?key=nilai
	=> CONTOH RESPONSE
	- KALO DATA ADA ---> [ {}, {}, {} ] bentuk array index multidimensi isi object
	- KALO DATA GAK ADA ----> [] bentuk array kosong
	*/

	//Contoh : https://url_service/course/get_data
	url_endpoint += "/get_data";		
	//Contoh Endpoint akhir : https://url_service/course/get_data?key_data_param={nilai}
	get_API(  url_endpoint, data_param, callback );
}

//Fungsi ketika mencari data
//Contoh : https://url_service/endpoint_service/get_row
//Contoh Endpoint akhir : https://url_service/course/get_row?key_data_param={nilai}
function get_search_filter( url_endpoint = "https://URL_SERVICE/endpoint_service", search_input = "", filter_input = {}, callback ) {
	/*
	=> data_param adalah parameter get pada url, contoh : ?key=nilai
	=> CONTOH RESPONSE
	- KALO DATA ADA ---> [ {}, {}, {} ] bentuk array index multidimensi isi object
	- KALO DATA GAK ADA ----> [] bentuk array kosong
	*/

	//Contoh : https://url_service/course/get_search_filter?by_search=sdsad&by_filter=level_admin%status_active%

	//Search Param 
	var param_search = search_input;
	//Filter param
	var param_filter = "";
	Object.entries(filter_input).forEach(([key, value]) => {
		param_filter += `${key}_${value}%`;
	});

	url_endpoint += "/get_search_filter";
	var data_param = {
		by_search : param_search,
		by_filter : param_filter
	};
	get_API(  url_endpoint, data_param, callback );
}

function get_API( url_endpoint = "https://URL_SERVICE/endpoint_service/method", data_param = {}, callback ) {

	//Melakukan permintaan dan menerima data berupa bentuknya data JSON
	console.log("+++ Melakukan request GET ke", url_endpoint);
	console.log( "Data Param URL :");
	console.log( data_param );

	$.ajax({
		url: url_endpoint,  // URL endpoint
		type: "GET",          // Metode HTTP (GET / POST)
		contentType : "application/JSON", //Bentuk data yang dikirim
		headers: {
			"X-User-Login": get_userLogin(),
		},
		data : data_param,
		dataType: "json", //Bentuk data yasng diterima
		success: function( response ) {
			console.log(response);
			callback( response );
		},
		error: function(xhr, status, error) {
			alert("Error data fatal"); 
			console.log(`+++++++++++++ ERROR : ${ url_endpoint }++++++++++++++++++++`);
			console.error("Error Msg XHR:", xhr);
			console.error("Error Status:", status);
			console.error("Error:", error);
			console.log("Error:", xhr);
			console.log("Error:", status);
			console.log("Error:", error);
			console.log(`++++++++++++++${ url_endpoint }+++++++++++++++++++`);

		}
	})
}


//+++++++ Untuk melakukan POST data ke API   ++++++++++++++++++++++++++

//FUNGSI INI BANYAK DIGUNAKAN OLEH FITUR DI ADMIN
function post_dataForm( endpoint_action_form, form_data, callback ) {
	// FUNGSI INI DIGUNAKAN DI FITUR MODUL ADMIN
	// form_data bisa berbentun hasil serialize form atau dari FormData
	// endpoint_action_form diambil dari action pada setiap form yang berisi nama servicdnya

	//Endppoint ini disarankan nilai yang diambil dari atribut action form 
	console.log("Menjalankan fungsi post_dataForm", form_data);

	//hasil : https://URL_SERVICE_CI/endpoint_service
	var url_endpoint = URL_SERVICE_CI + endpoint_action_form;
	post_tambah_data( url_endpoint, form_data, callback );
}
//Contoh : https://url_service/endpoint_service/post_update_data  POST 
function post_update_data( url_endpoint = "https://URL_SERVICE/endpoint_service", data_param_url="?id_data_kolom=nilai", data_post, callback ) {

	//Endppoint ini disarankan nilai yang diambil dari atribut action form 
	console.log("Menjalankan fungsi update_data", data_post);

	//Contoh https://URL_SERVICE_CI/endpoint_service/?id_data_kolom={nilai}
	url_endpoint = url_endpoint + `/post_update_data${data_param_url}`;
	post_API( url_endpoint, data_post, callback );
}

//Contoh : https://url_service/endpoint_service/tambah_data  POST 
function post_tambah_data( url_endpoint = "https://URL_SERVICE/endpoint_service", data_post, callback ) {

	//Endppoint ini disarankan nilai yang diambil dari atribut action form 
	console.log("Menjalankan fungsi post_tambah_data", data_post);

	//hasil => https://URL_SERVICE_CI/endpoint_service/post_tambah_data
	url_endpoint = url_endpoint + "/post_tambah_data";
	post_API( url_endpoint, data_post, callback );
}
function post_API( url_endpoint, data = {}, callback = false ) {



	/*
	CONTOH RESPONSE
	
	KALO SUKSES 
	{
		status true:,
		msg : ""
	}

	KALO GAGAL
	{
		status false:,
		msg : "" 
	}
	*/

	//Handling callbacks
	if (callback == false) {
		callback = function( s ) {
			return 1;
		}
	}

	console.log("+++ Melakukan request POST ke", url_endpoint, data);
	console.log( "DATA POST" );
	console.log( data );

	//INGAT data yang diterima itu dalam bentuk JSON
	// argumen untuk parameter data berbentuk Object
	$.ajax({
		url: url_endpoint,  // URL endpoint
		type: "POST",          // Metode HTTP (GET / POST)
		// contentType : "application/JSON", //Bentuk data yang dikirim
		headers: {
			"X-User-Login" : get_userLogin(),
		},
		dataType: "json", //Bentuk data yasng diterima itu json dan otomaatis akan diubah ke bentuk object
		data : data, 
		success: function( response ) {
			//response berbentuk Object yang otomaris sudah diubah ke Object karena nilai dataTypenya adalah json
			callback( response );
		},
		error: function(xhr, status, error) {
			callback( xhr );
			alert("Error data fatal"); 
			console.log(`+++++++++++++ ERROR : ${ url_endpoint }++++++++++++++++++++`);
			console.error("Error Msg XHR:", xhr);
			console.error("Error Status:", status);
			console.error("Error:", error);
			console.log("Error:", xhr);
			console.log("Error:", status);
			console.log("Error:", error);
			console.log(`+++++++++++++ ERROR : ${ url_endpoint }++++++++++++++++++++`);

		}
	})
}

