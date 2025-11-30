var LAT = "", LONG = "";

$(document).ready(function() {

	SET_LAT_LONG( "", "" );
	maps_update();

	$('body').on('click', '.btn_lacak_project', function(e) {
		lacak_project( $(this) );
	});
	$('body').on('click', '.btn_lacak_teknisi', function(e) {
		lacak_teknisi( $(this) );
	});

}); 
var lacak_project = ( btn_lacak ) => {
	var card_project = btn_lacak.parents('.card_project.data_project');
	var data_row_project = card_project.attr('data-row-project');
	data_row_project = cv_json_obj( data_row_project );
	var lat = data_row_project.lat;
	var long = data_row_project.long;

	SET_LAT_LONG( lat, long );
	maps_update();
};
var lacak_teknisi = ( btn_lacak ) => {
	var row_teknisi = btn_lacak.parents('tr.row_teknisi');
	var data_row_teknisi = row_teknisi.attr('data-row-teknisi');
	data_row_teknisi = cv_json_obj( data_row_teknisi );
	var lat = data_row_teknisi.lat;
	var long = data_row_teknisi.long;

	SET_LAT_LONG( lat, long );
	maps_update();
};

var SET_LAT_LONG = ( lat, long ) => {
	LAT = lat;
	LONG = long;
};
var maps_update = ( lat = LAT, long = LONG) => {

	var monitoring_maps = $('.monitoring_maps');
	var maps = monitoring_maps.find('#maps');

	lat = lat.toString();
	long = long.toString();

	if ( lat.length > 0 && long.length > 0 ) {
		//Url embed maps dengan koordinat
		url = `https://www.google.com/maps?q=${lat},${long}&hl=id&z=15&output=embed`;
	}else {
		//Url embed maps tanpa koordinat maps default
		url = ``;
	}

	maps.attr('src', url);

}


// Ambil Lokasi 
async function getLocationValue() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				resolve({
					lat: pos.coords.latitude,
					long: pos.coords.longitude
				});
			},
			(err) => reject(err)
			);
	});
}
async function get_lokasi_user( callback = false ) {

	//Eror handling type data
	if ( callback == false ) {
		callback = function() {
			return 1;
		}
	}

	try {
		const lokasi = await getLocationValue();
		console.log("Latitude:", lokasi.lat);
		console.log("Longitude:", lokasi.long);

		callback( lokasi.lat, lokasi.long );
	} catch (e) {
		console.log("Error:", e.message);
	}
}
