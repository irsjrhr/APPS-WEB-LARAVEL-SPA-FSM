function load_table_level( data = [] ) {


	var row_struktur = {
		id_level: "",
		nama_level: "Beginner",
		user_admin : "DEBUG",
		waktu: "2025-03-25",
		status: "ACTIVE"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}

	// Contoh data dummy
	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum menambahkan data baru
	var rowContent = "";

	for (var i = 0; i < data.length; i++) {
		var row = data[i];

		rowContent += `
		<tr>
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="link_opt">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${row.nama_level}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++
function load_table_account( data = [] ) {

	// Contoh data JSON yang berasal dari server
	var row_struktur = {
		alamat: "NULL",
		email: "irshandy@gmail",
		id_file_profile: "",
		source_file_profile: "",
		id_user: "40",
		level: "user_guru",
		nama: "asd",
		password: "ada",
		status: "ACTIVE",
		user: "assdafa",
		user_pembuat: "REGISTER",
		waktu: "2024-12-24"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}



	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum tambah data baru
	var rowContent = "";
	for (var i = 0; i < data.length; i++) {


		var row = data[i];
		var data_row_json = cv_obj_json( row );

		rowContent += `
		<tr data-row="${data_row_json}">
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="link_opt update_data">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-edit"></i> Update Level
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td><img src="${row.source_file_profile}" class="profile"></td>
		<td>${row.user}</td>
		<td>${row.email}</td>
		<td>${row.nama}</td>
		<td>${row.level}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++
function load_table_course( data = [] ) {

	// Contoh data JSON yang berasal dari server
	var row_struktur = {
		deskripsi_course: "",
		id_course: "4",
		nama: "admin",
		nama_course: "Matematika",
		status: "ACTIVE",
		user_admin: "admin",
		waktu: "2024-09-22"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}

	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum tambah data baru
	var rowContent = "";
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		rowContent += `
		<tr>
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="link_opt update_data">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a target="_blank" href="${BASE_URL_PAGE}AppCourse?id_course=${row.id_course}" class="link_opt">
		<i class="fas fa-edit"></i> Atur Lesson
		</a>
		<a href="${BASE_URL_PAGE}AppCourse?id_course=${row.id_course}" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${row.nama_course}</td>
		<td>${row.deskripsi_course}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}


	tableBody.append(rowContent);
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++

function load_table_transaksi_kategori( data = [] ) {

	var row_struktur = {
		id_transaksi_kategori: "Beginner",
		user_admin : "DEBUG",
		nama_transaksi_kategori: "Beginner",
		deskripsi_transaksi_kategori: "Beginner",
		waktu: "2025-03-25",
		status: "ACTIVE"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}

	// Contoh data dummy
	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum menambahkan data baru
	var rowContent = "";

	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var data_row_json = cv_obj_json( row );


		rowContent += `
		<tr data-row="${data_row_json}">
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="update_data link_opt">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${ row.id_transaksi_kategori }</td>
		<td>${row.user_admin}</td>
		<td>${row.nama_transaksi_kategori}</td>
		<td>${row.deskripsi_transaksi_kategori}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++

function load_table_transaksi_pemasukan( data = [] ) {


	var row_struktur = {
		id_transaksi_pemasukan: "",
		id_transaksi_kategori: "Beginner",
		user_admin : "DEBUG",
		nama_transaksi: "Beginner",
		nominal_transaksi: "Beginner",
		catatan_transaksi: "Beginner",
		waktu_transaksi: "Beginner",
		id_file: "Beginner",
		source_file: "Beginner",
		waktu: "2025-03-25",
		status: "ACTIVE"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}

	// Contoh data dummy
	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum menambahkan data baru
	var rowContent = "";

	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var data_row_json = cv_obj_json( row );


		rowContent += `
		<tr data-row="${data_row_json}">
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="update_data link_opt">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${ row.id_transaksi_pemasukan }</td>
		<td>${ row.id_transaksi_kategori }</td>
		<td>${row.user_admin}</td>
		<td>${row.nama_transaksi}</td>
		<td>${ formatRupiah(row.nominal_transaksi) }</td>
		<td>${row.catatan_transaksi}</td>
		<td>
		<div class="btn btn-primary btn_modal_view" data-href="${row.source_file}" target="_blank"> 
		<i class="fas fa-eye"> </i>
		</div>
		</td>
		<td>${row.waktu_transaksi}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++

function load_table_transaksi_pengeluaran( data = [] ) {


	var row_struktur = {
		id_transaksi_pengeluaran: "",
		id_transaksi_kategori: "Beginner",
		user_admin : "DEBUG",
		nama_transaksi: "Beginner",
		nominal_transaksi: "Beginner",
		catatan_transaksi: "Beginner",
		waktu_transaksi: "Beginner",
		id_file: "Beginner",
		source_file: "Beginner",
		waktu: "2025-03-25",
		status: "ACTIVE"
	};
	//Cek validasi data agar konsistensi
	var validasi_data_row = validasi_data( row_struktur, data ); 
	if ( validasi_data_row.param_data == false ) {
		//Data tidak tidak bisa di load di table, karena persyaratan yang tidak terpenuhi. 
		return validasi_data_row.param_data; //Menghentikan jalan fungsi 
	}

	// Contoh data dummy
	var tableBody = $(".table_data").find('tbody');
	tableBody.empty(); // Bersihkan tabel sebelum menambahkan data baru
	var rowContent = "";

	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var data_row_json = cv_obj_json( row );


		rowContent += `
		<tr data-row="${data_row_json}">
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="update_data link_opt">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${ row.id_transaksi_pengeluaran }</td>
		<td>${ row.id_transaksi_kategori }</td>
		<td>${row.user_admin}</td>
		<td>${row.nama_transaksi}</td>
		<td>${ formatRupiah(row.nominal_transaksi) }</td>
		<td>${row.catatan_transaksi}</td>
		<td>
		<div class="btn btn-success btn_download" data-href="${row.source_file}" target="_blank"> 
		<i class="fas fa-download"> </i>
		</div>
		</td>
		<td>${row.waktu_transaksi}</td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function load_table_transaksi_pembayaran(data = []) {
	var row_struktur = {
		id_transaksi_pembayaran: "",
		user_admin: "DEBUG",
		nama_item: "Sample",
		harga: 0,
		qty: 0,
		total_harga: 0,
		nama_pembeli: "Sample",
		alamat_pembeli: "Sample",
		email_pembeli: "sample@email.com",
		waktu_bayar: "2025-03-25",
		order_id_midtrans: "ORD-123",
		status_pembayaran: "pending",
		waktu: "2025-03-25",
		status: "ACTIVE"
	};

	var validasi_data_row = validasi_data(row_struktur, data); 
	if (!validasi_data_row.param_data) {
		return false;
	}

	var tableBody = $(".table_data").find('tbody');
	tableBody.empty();
	var rowContent = "";

	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		var data_row_json = cv_obj_json(row);

		rowContent += `
		<tr data-row='${data_row_json}'>
		<td>
		<button class="btn btn-default btn_opt"><i class="fas fa-ellipsis-v"></i></button>
		<div class="menu_opt">
		<div class="link_opt close_opt">Tutup</div>
		<a href="#" class="update_data link_opt">
		<i class="fas fa-edit"></i> Edit
		</a>
		<a href="#" class="buat_pembayaran link_opt">
		<i class="fas fa-wallet"></i> Buat Pembayaran
		</a>
		<a href="#" class="update_status_pembayaran link_opt">
		<i class="fas fa-cog"></i> Update Status Pembayaran
		</a>
		<a href="#" class="link_opt">
		<i class="fas fa-trash"></i> Hapus
		</a>
		</div>
		</td>
		<td>${i + 1}</td>
		<td>${row.id_transaksi_pembayaran}</td>
		<td>${row.user_admin}</td>
		<td>${row.nama_item}</td>
		<td>${ formatRupiah(row.harga) }</td>
		<td>${row.qty}</td>
		<td>${ formatRupiah(row.total_harga) }</td>
		<td>${row.nama_pembeli}</td>
		<td>${row.alamat_pembeli}</td>
		<td>${row.email_pembeli}</td>
		<td>${row.waktu_bayar}</td>
		<td>${row.order_id_midtrans}</td>
		<td><div class="label ${row.status_pembayaran}">${row.status_pembayaran}</div></td>
		<td>${row.waktu}</td>
		<td><div class="label ${row.status}">${row.status}</div></td>
		</tr>`;
	}

	tableBody.append(rowContent);
}



