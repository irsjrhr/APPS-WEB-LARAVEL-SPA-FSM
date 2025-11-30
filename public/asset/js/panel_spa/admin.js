$(document).ready(function(e) {
	//+++++++++++++++++ Method Event Terkait Account ++++++++++++
	//Event pemindahan data ke modal form update dari tabel row data yang dipilih
	var by_update_state = false;
	$('body').on('click', '.section_content[data-fungsi=account] .update_data', function() {

		//Ambil data row json di tr parentnya  
		var section_content = $('.section_content[data-fungsi=account]');
		var link_update_data = $( this );
		var tr = link_update_data.parents( 'tr' );
		var data_row_json = tr.attr('data-row');
		data_row_json = cv_json_obj( data_row_json );
		var modal_update_profile = section_content.find('#modal_update_profile');

		by_update_state =  data_row_json.user;

		//Isi input data diri
		modal_update_profile.find('[name=nama]').val(data_row_json.nama);
		modal_update_profile.find('[name=email]').val(data_row_json.email);
		modal_update_profile.find('[name=alamat]').val(data_row_json.alamat);

		//Isi id file dan source file 
		modal_update_profile.find('#nama_file').text("NONE");
		modal_update_profile.find('[name=id_file]').val(data_row_json.id_file_profile);
		modal_update_profile.find('[name=source_file]').val(data_row_json.source_file_profile);

		modal_update_profile.modal('show');
	});
	//Event update submit form profile account
	$('body').on('submit', '#modal_update_profile form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form
		var form = $(this);
		var modal_target = form.parents('.modal');
		var data_post = form.serialize();
		var url_endpoint = URL_SERVICE_CI + "account";
		var data_param_url = `?by_user=${by_update_state}`;
		loader_page('show', null);
		post_update_data( url_endpoint, data_param_url, data_post, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			modal_target.modal('hide');
			load_table_active();
		} );
	});
	//+++++++++++++++++ EN Of Method Event Terkait Account ++++++++++++

	//+++++++++++++++++ Method Event Terkait Transaksi Kategori ++++++++++++
	//Event pemindahan data ke modal form update dari tabel row data yang dipilih
	var by_update_state = false;
	$('body').on('click', '.section_content[data-fungsi=transaksi_kategori] .update_data', function() {

		//Ambil data row json di tr parentnya  
		var section_content = $('.section_content[data-fungsi=transaksi_kategori]');
		var link_update_data = $( this );
		var tr = link_update_data.parents( 'tr' );
		var data_row_json = tr.attr('data-row');
		data_row_json = cv_json_obj( data_row_json );
		var modal_update = section_content.find('#modal_update');

		by_update_state =  data_row_json.id_transaksi_kategori;

		modal_update.find('[name=nama_transaksi_kategori]').val(data_row_json.nama_transaksi_kategori);
		modal_update.find('[name=deskripsi_transaksi_kategori]').val(data_row_json.deskripsi_transaksi_kategori);
		modal_update.modal('show');
	});
	//Event update submit form transaksi kategori
	$('body').on('submit', '.section_content[data-fungsi=transaksi_kategori] #modal_update form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form
		var form = $(this);
		var modal_target = form.parents('.modal');
		var data_post = form.serialize();
		var url_endpoint = URL_SERVICE_CI + "transaksi_kategori";
		var data_param_url = `?by_id=${by_update_state}`;
		loader_page('show', null);
		post_update_data( url_endpoint, data_param_url, data_post, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			modal_target.modal('hide');
			load_table_active();
		} );
	});
	//+++++++++++++++++ End Of Method Event Terkait Transaksi Kategori ++++++++++++


	//+++++++++++++++++ Method Event Terkait Transaksi Pembayaran ++++++++++++
	//Event pemindahan data ke modal form update dari tabel row data yang dipilih
	var by_update_state = false;
	$('body').on('click', '.section_content[data-fungsi=transaksi_pembayaran] .update_data', function() {

		// Ambil data row json di <tr> parentnya  
		var section_content = $('.section_content[data-fungsi=transaksi_pembayaran]');
		var link_update_data = $(this);
		var tr = link_update_data.parents('tr');
		var data_row_json = tr.attr('data-row');
		data_row_json = cv_json_obj(data_row_json);
		var modal_update = section_content.find('#modal_update');

		// Simpan state id / PK untuk update
		by_update_state = data_row_json.id_transaksi_pembayaran;

		// Isi form di modal update sesuai struktur tabel
		modal_update.find('[name=nama_item]').val(data_row_json.nama_item);
		modal_update.find('[name=harga]').val(data_row_json.harga);
		modal_update.find('[name=qty]').val(data_row_json.qty);
		modal_update.find('[name=total_harga]').val(data_row_json.total_harga);
		modal_update.find('[name=nama_pembeli]').val(data_row_json.nama_pembeli);
		modal_update.find('[name=alamat_pembeli]').val(data_row_json.alamat_pembeli);
		modal_update.find('[name=email_pembeli]').val(data_row_json.email_pembeli);
		modal_update.find('[name=waktu_bayar]').val(data_row_json.waktu_bayar);
		modal_update.find('[name=orderid_midtrans]').val(data_row_json.orderid_midtrans);
		modal_update.find('[name=status_pembayaran]').val(data_row_json.status_pembayaran);

		// Tampilkan modal
		modal_update.modal('show');
	});
	//Event update submit form transaksi pembayaran
	$('body').on('submit', '.section_content[data-fungsi=transaksi_pembayaran] #modal_update form', function(e) {
		e.preventDefault(); //Menghentikan laju fungsi submit pada form
		var form = $(this);
		var modal_target = form.parents('.modal');
		var data_post = form.serialize();
		var url_endpoint = URL_SERVICE_CI + "transaksi_pembayaran";
		var data_param_url = `?by_id=${by_update_state}`;
		loader_page('show', null);
		post_update_data( url_endpoint, data_param_url, data_post, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			modal_target.modal('hide');
			load_table_active();
		} );
	});	
	//Event update dan cek status pembayaran
	$('body').on('click', '.update_status_pembayaran', function() {
		var btn = $(this);
		var tr = btn.parents('tr');
		var data_row = tr.attr('data-row');
		data_row = cv_json_obj( data_row );
		console.log( data_row );
		var url_endpoint = URL_SERVICE_CI + "transaksi_pembayaran" + "/post_update_status_pembayaran";
		var data_param_url = `?by_id=${data_row.id_transaksi_pembayaran}`;
		url_endpoint = url_endpoint + data_param_url;
		loader_page('show', null);
		post_API( url_endpoint, {}, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			load_table_active();
		});
	});
	//Event buat pembayaran
	$('body').on('click', '.buat_pembayaran', function() {
		var btn = $(this);
		var tr = btn.parents('tr');
		var data_row = tr.attr('data-row');
		data_row = cv_json_obj( data_row );
		console.log( data_row );
		var url_endpoint = URL_SERVICE_CI + "transaksi_pembayaran" + "/post_bayar_midtrans";
		var data_param_url = `?by_id=${data_row.id_transaksi_pembayaran}`;
		url_endpoint = url_endpoint + data_param_url;
		loader_page('show', null);
		post_API( url_endpoint, {}, function( response ) {
			loader_page('hide', null);
			console.log(response);
			var msg = response.msg;
			Swal.fire( msg );
			load_table_active();
			if ( response.status == true ) {
				var url_direct_midtrans = response.url_direct_midtrans;
				var snap_token = response.snap_token;
				var client_key = response.client_key;
				window.open( url_direct_midtrans, "_blank" );
				// open_modal_pembayaran( url_direct_midtrans ); 

			}
		});
	});
	//+++++++++++++++++ End Of Method Event Terkait Transaksi Pembayaran ++++++++++++
});