
<section class="section_content" data-fungsi="profile" style="position:relative;">
	<div class="header_page">
		<h1>
			Buat Project
		</h1>
	</div>


	{{-- Container tambah project --}}
	<div class="container_tambah_project">

		<div class="loader_page loader_tambah_project"></div>
		<form method="post">

			<div class="header_content_form">
				Form Project
			</div>

			{{-- Container content form --}}
			<div class="body_content_form">
				<input type="hidden" name="lat" value="none">
				<input type="hidden" name="long" value="none">
				<input type="hidden" name="id_teknisi" value="none">

				{{-- Content Form - Form Teknisi --}}
				<div class="container-fluid content_form active" id="form_input">
					{{-- Row Form --}}
					<div class="row row_form">
						<div class="col-sm col_form_input">
							<div class="form-group">
								<label> Nama Project : </label>
								<input autosave type="text" name="nama" class="form-control" required placeholder="Nama Project">
							</div>
							<div class="form-group">
								<label> Product Project </label>
								<select class="form-control" name="product_project">
									<!-- Ini akan ditambahkan dengan jvascript -->
									<option> Maintance Videotron </option>
								</select>
							</div>
							<div class="form-group">
								<label> Waktu Project : </label>
								<input autosave type="date" name="nama" class="form-control" required placeholder="Waktu Project ">
							</div>
							<div class="form-group">
								<label> Deskripsi Project : </label>
								<textarea style="height: 250px;" autosave name="nama" class="form-control" required placeholder="Nama Project">
								</textarea>
							</div>
						</div>
						{{-- end of col form input  --}}

						{{-- col form maps --}}
						<div class="col-sm-7 col_form_maps">
							<div class="loader_page loader_update_lokasi"></div>
							<div class="form-group">
								<label> Lokasi Client : </label>
								<br>
								<button type="button" class="btn btn-primary btn_ambil_lokasi mb-3">
									Update Lokasi Kamu
								</button>
								<!-- Section monitoring maps -->
								<section class="monitoring_maps">

									<iframe id="maps" style="border:0;"loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade">
									</iframe>

								</section>

							</div>
						</div>
						{{-- end of col form maps --}}
					</div>
					{{-- End Of Row Form --}}
				</div>
				{{-- End Of Content Form - Form Teknisi --}}
				{{-- Content Form - Form Rekom Teknisi --}}
				<div class="container-fluid content_form" id="form_rekom_teknisi">

					{{-- Row Teknisi - Tempat Loop --}}
					<div class="row row_teknisi">
						@for ($i = 0; $i < 20; $i++)
						<div class="col-12 col_teknisi" data-id-teknisi="{{$i}}">
							<div class="teknisi_img">
								<img src="{{ asset('asset/gam/user.png') }}">
							</div>
							<div class="teknisi_info">
								<p> Teknisi {{$i}} </p>
								<p> {{ $i+1 }} km </p>
								<button type="button" class="btn btn-success btn_pilih_teknisi"> Pilih </button>
							</div>
						</div>
						@endfor

					</div>
					{{-- End Of Row Teknisi --}}
				</div>
				{{-- End Of Content Form - Form Rekom Teknisi --}}
			</div>
			{{-- End Of Container content form --}}



			<div class="form-group mt-5">
				<button type="submit" name="submit" class="btn btn-primary form-control">
					Submit
				</button>
			</div>

		</form>
	</div>
	{{-- End Of Container tambah project --}}










</section>


<script type="text/javascript">
	// LAT = "-6.1753924", LONG = "106.827153";
	var loader_tambah_project, lat_input, long_input, id_teknisi_input;
	$(document).ready(function() {

		loader_tambah_project = $('.loader_tambah_project');
		lat_input = $('input[name=lat]');
		long_input = $('input[name=long]');
		id_teknisi_input = $('input[name=id_teknisi]');

		maps_update();
		// Submit Form 
		$('body').on('submit', 'form', function(e) {
			e.preventDefault();

			//pengecekan agar input lat, long, dan id teknisi diisi
			var lat = lat_input.val();
			var long = long_input.val();
			var id_teknisi = id_teknisi_input.val();
			if ( lat != "none" && long != "none" && id_teknisi != "none" ) {
				//Jika semua input sudah terisi, maka submit api ke BE tambah project
				loader_page( 'show',  loader_tambah_project, "Membuat Project Baru ......");
				//Nanti settimeout itu adalah request POST api tambah project 
				setTimeout(function() {
					Swal.fire( "Project berhasil dibuat!! Pantau project kamu." );
					load_page( BASE_URL_PAGE + "user/monitoring");
				},3000);
			}else{
				//Jika ada input belum terisi atau ada lokasi atau teknisi yng masih ernilai none
				if ( lat == "none" || long == "none" ) {
					//Jika lokasinya belum di update, maka Pindah ke form input
					form_input_toggle();
				}else if ( id_teknisi == "none" ){
					//Jika id teknisi belum di pilih, maka Pindah ke form rekom teknisi
					form_rekom_teknisi_toggle();
				}
			}


		});


		// Event Pilih Teknisi
		$('body').on('click', '.btn_pilih_teknisi', function() {
			var col_teknisi = $('.col_teknisi');
			var btn_pilih_teknisi = $(this);
			var col_teknisi_target = btn_pilih_teknisi.parents('.col_teknisi');
			var data_id_teknisi = col_teknisi_target.attr('data-id-teknisi');

			//Update input id teknisi 
			$('input[name=id_teknisi]').val( data_id_teknisi );
			//Kasih Efek Untuk Teknisi
			col_teknisi.removeClass('active');
			col_teknisi_target.addClass('active');

		}); 

		//Button ambil lokasi user
		$('body').on('click', '.btn_ambil_lokasi', function() {
			loader_page( 'show',  $('.loader_update_lokasi'), "Mengambil lokasi anda");
			get_lokasi_user( function( lat, long ) {
				lat_input.val( lat );
				long_input.val( long );
				//Update juga di visualiasi mapsnya
				SET_LAT_LONG( lat, long ); 
				maps_update();

				console.log( "+====LOKASI TERUPDATE", lat + "," + long );
				loader_page( 'hide',  $('.loader_update_lokasi'), "");

			});
		});



	}); 
	
	var form_input_toggle = () =>{
		Swal.fire('Lengkapi form dan update lokasi kamu!');
		var content_form = $('.content_form');
		var form_input = content_form.filter('#form_input');
		var form_rekom_teknisi = content_form.filter('#form_rekom_teknisi');
		var header_content_form = $('.header_content_form');

		header_content_form.text('Form Project');
		content_form.removeClass('active');
		form_input.addClass('active');

	}
	var form_rekom_teknisi_toggle = () =>{
		Swal.fire('Pilih teknisi yang tersedia!');
		var content_form = $('.content_form');
		var form_input = content_form.filter('#form_input');
		var form_rekom_teknisi = content_form.filter('#form_rekom_teknisi');
		var header_content_form = $('.header_content_form');
		var loader_tambah_project = $('.loader_tambah_project');

		header_content_form.text('Rekomendasi Teknisi');
		loader_page( 'show',  loader_tambah_project, "Mencari Teknisi");

		//Nanti settimeout itu adalah request GET api data teknisi rekomendasi 
		setTimeout(function() {
			loader_page( 'hide',  loader_tambah_project, "Mencari Teknisi");
			content_form.removeClass('active');
			form_rekom_teknisi.addClass('active');
		}, 3000);


	}

</script>


