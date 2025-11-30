//+++++++++++++++++++++++++++++++++++++++++++++++++++
function formatRupiah(angka) {
	if (angka === null || angka === undefined) return "Rp 0";
	return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function isSameStructure(row_struktur, row_response) {
	let keys_struktur = Object.keys(row_struktur);
	let keys_response = Object.keys(row_response);

	// cek apakah semua key_struktur ada di key_response
	return keys_struktur.every(key => keys_response.includes(key));
}
function checkSameStructure(row_struktur, row_response) {
	let keys_struktur = Object.keys(row_struktur);
	let keys_response = Object.keys(row_response);

	// cari key yang hilang
	let missingKeys = keys_struktur.filter(key => !keys_response.includes(key));

	return {
		isValid: missingKeys.length === 0,
		missing: missingKeys
	};

	
}

//Melakukan validasi data agar data response yang diterima itu konsisten sama dengan data yang ditentukan pada setiap table
function validasi_data( row_struktur, data_reponse ) {
	//Cek struktur data_reponse dari data_reponse yang diterima agar terjadi konsistensi data_reponse 
	//Mengecek apakah row_struktur yang di tentukan sama strukturnya dengan row pada data_response yang diterima, dan kalo mau bener harus sama strukturnya.
	// Row responsenya adalah row index pertama di data_response dan makanya data_response gak boleh kosong.
	var param_data = true;
	var msg_false;
	if ( data_reponse.length > 0 ) {
		// Jika datanya ada, maka ambil 
		var row_response = data_reponse[0];

		var checkSameStructure_valid = checkSameStructure( row_struktur, row_response );
		if ( checkSameStructure_valid.isValid == true ) {
			//Struktur data_reponse sama
			param_data = true;
		}else{
			//Struktur data_reponse tidak sama
			param_data = false;
			msg_key_missing = checkSameStructure_valid['missing'],
			msg_false = "Strukur data_reponse yang di terima tidak sesuai dengan struktur data_reponse yang telah ditentukan sebelumnya! Cek Console";
		}

		console.log("+++++++ Validasi Struktur ++++++++");
		if ( param_data == false ) {
			console.error( msg_false );
			console.error( msg_key_missing );
			alert( msg_false );
		}
		console.log("Row Strukur", row_struktur);
		console.log("Row Response", row_response);
		console.log("+++++++ End Validasi Struktur ++++++++");


	}else{
		msg_false = "Tidak ada data_reponse yang di terima";
		param_data = false;
	}

	return { 
		param_data : param_data,
		msg_false : msg_false,
	}
}
