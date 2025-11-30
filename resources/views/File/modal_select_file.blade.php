
<style type="text/css">



#modal_select_file{
	z-index: 8888888;
}

#modal_tambahFile_async{
	z-index: 99999999;
}

.col_file{
	text-align: center;
	margin-bottom: 20px;
	cursor: pointer;
	position: relative;

}
.col_file *{
	background: #fff;
	color: #000;
}

.col_file.active *{
	background: #ccc;
	color: #fff;
}

.col_file input[type=radio]{
	position: absolute;
	left: 20px;
	top: 20px;

}
.load_ajax_data{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, .8);
	z-index: 9999999;	
	display: none;
}
.load_ajax_data img{
	width: 100px;
	height: 100px;
}
#modal_select_file img.col_file_img{
	width: 100px;
	height: 100px;
}

.indicator_tipe_penyimpanan{
	padding: 20px;
	padding-top: 10px;
	margin-bottom: 20px;
	text-align: center;
	cursor: pointer;
	text-align: center;
}
.indicator_tipe_penyimpanan:hover,
.indicator_tipe_penyimpanan.active{
	border-bottom: 2px solid darkcyan;

}


.row_info_file {
	display: flex;
	flex-direction: row;
}
.row_info_file > div{
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.col_indicator_str{
	width: 100%;
	height: auto;
	border-radius: 4px;
	padding-bottom: 10px;
	cursor: pointer;
	transition: 1s;
}
.col_indicator_str.active,
.col_indicator_str:hover{
	border: 1px solid #000;
}
.col_indicator_str .judul{
	font-size: 20px;
	font-weight: bolder;
	color: green;
}
.col_indicator_str .kapasitas{
	text-align: right;
}
.bar_indicator_el{
	width: 100%;
	height: 10px;
	background: grey;
	border-radius: 20px;
	position: relative;
}
.bar_indicator_el .bar_indicator{
	width: 50%;
	height: 100%;
	border-radius: inherit;
	background: green;
}
.bar_indicator_el{
	margin-bottom: 10px;
}


</style>
<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/file.css">

<!-- Modal Select File -->
<div class="modal fade" id="modal_select_file" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-baseUrl="{{asset('')}}">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel"> Modal Select File  </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="position: relative;overflow: auto;max-height: 400px;">

				
				<div class="container_tipe_penyimpanan">
					<div class="container-fluid">
						<div class="row">
							<div class="col indicator_tipe_penyimpanan active" id="all">
								ALL
							</div>
							<div class="col indicator_tipe_penyimpanan" id="lokal">
								Lokal
							</div>
							<div class="col indicator_tipe_penyimpanan" id="cloud">
								Cloud
							</div>
							<div class="col indicator_tipe_penyimpanan" id="url">
								URL
							</div>

						</div>
						<div class="row row_info_file">
							<!-- Col Indicator Str  -->
							<div class="col-lg-12 col_indicator_str lokal" id="lokal">
								<div class="row_info_kapasitas">
									<div class="judul">
										Lokal
									</div>
									<div class="kapasitas"> 
										- MB
									</div>
								</div>
								<div class="bar_indicator_el">
									<div class="bar_indicator"></div>
								</div>
								<div class="kapasitas_terapakai kapasitas_terpakai">
									- mb digunakan
								</div>
							</div>
							<!-- Col Indicator Str  -->
							<div class="col-lg-12 col_indicator_str cloud" id="cloud">
								<div class="row_info_kapasitas">
									<div class="judul">
										Cloud
									</div>
									<div class="kapasitas"> 
										- MB
									</div>
								</div>
								<div class="bar_indicator_el">
									<div class="bar_indicator"></div>
								</div>
								<div class="kapasitas_terapakai kapasitas_terpakai">
									- mb digunakan
								</div>
							</div>
						</div>
					</div>
				</div>


				<!-- Load ajax element -->
				<div class="load_ajax_data text-center pt-5">
					<img src="{{ asset('asset/gam/load.gif') }}">
					<h3 class="mt-3 text_caption"> Fetch Data .... </h3>
				</div>
				<!-- End Of Load ajax element -->

				<div class="container-fluid container_modal_menu" style="height: 300px;overflow: auto;">


					<!-- Akan muncul ketika data filenya kosong -->
					<div class="row file_empty" style="display: none;">
						<div class="col-12 text-center">
							<h1> No File Upload </h1>
							<button data-target="#modal_tambahFile_async" data-toggle="modal" class="btn btn-primary">
								Upload File Baru <span><i class="fas fa-upload"></i></span>
							</button>
						</div>
					</div>
					<!-- End Of Akan muncul ketika data filenya kosong -->
					<div class="row justify-content-center row_col_file">
						<!-- AKAN DITAMBAHKAN OLEH AJAX JQUERY
							<div class="col-sm-4 col_file" data-idfile='' data-sourceFile data-namafile=''  onclick="col_file_click(this)">
								<div class="card" style="width: 100%;">
									<div class="card-body">
										<i class="fas fa-file"></i>
										<p>  </p>
									</div>
								</div>
							</div>
						-->
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="container-fluid">
					<div class="row">
						<div class="col-sm mb-3 text-left">
							<button data-target="#modal_tambahFile_async" data-toggle="modal" class="btn btn-primary">
								Upload File Baru <span><i class="fas fa-upload"></i></span>
							</button>
							<a href="{{ asset('AppStorage') }}" class="btn btn-warning">
								Atur Storage <span><i class="fas fa-database"></i></span>
							</a>
						</div>
						<div class="col-sm text-right">
							<button class="btn btn-secondary btn_refresh_select">
								Muat Ulang
							</button>
							<button class="btn btn-dark btn_preview_select">
								Preview
							</button>
							<button class="btn btn-success btn_submit_select">
								Pilih
							</button>

						</div>
					</div>
				</div>


			</div>

		</div>
	</div>
</div>

<!-- End Of Modal Select File -->



<!-- Modal Tambah File Async -->
<div class="modal fade" id="modal_tambahFile_async" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel"> Form Tambah File - Async </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body" style="position: relative;">
				<!-- Load ajax element -->
				<div class="load_ajax_data text-center pt-5">
					<img src="{{ asset('asset/gam/load.gif') }}">
					<h3 class="mt-3 text_caption"> Mengirim Data .... </h3>

					<!-- Bar Indicator  -->
					<div style="padding: 20px;">
						<div class="bar_indicator_el" id="bar_tambah_file">
							<div class="bar_indicator"></div>
						</div>
					</div>

				</div>
				<!-- End Of Load ajax element -->

				<form method="post" action="{{asset('')}}Admin_file/tambah" enctype="multipart/form-data">


					<div class="form-group">
						<label> Nama File : </label>
						<input autosave type="text" name="nama_file" class="form-control" required placeholder="Nama File Baru">
					</div>


					<div class="form-group">
						<label> Tipe Penyimpanan : </label>

						<select class="form-control" name="tipe_penyimpanan">
							<option value="lokal"> LOKAL </option>
							<option value="url"> URL </option>
							<option value="cloud"> CLOUD </option>
						</select>
					</div>

					<!-- JS EFFECT - Input Akan muncul sesuai Tipe penyimpanan yang di pilih antara upload file dengan url pada form select dengan name tipe_peyimpanan -->
					<div class="form-group form_row_tipe">
						<input required type="file" name="upload_file" style="display: none;">
						<input required class="form-control" placeholder="masukkan url file kamu disini" type="text" name="url_file" style="display: none;">
					</div>
					<!-- END JS EFFECT - Input Akan muncul sesuai Tipe penyimpanan yang di pilih antara upload file dengan url -->


					<div class="form-group">
						<button name="submit" type="submit" class="form-control btn btn-success">
							SUBMIT
						</button>
					</div>

				</form>

			</div>

		</div>
	</div>
</div>



<!-- Modal View File Async -->
<div class="modal fade" id="modal_view_file" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">  Modal View Media </h5>
				<div class="btn btn-success btn_download ml-3" data-href="" target="_blank"> 
					<i class="fas fa-download"> </i>
				</div>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>

			</div>
			<div class="modal-body" style="position: relative;">
				<div class="loader_page loader_view" style="position:absolute;left: 0;top: 0;"></div>
				<div class="container_modal_view" style="position:relative;">
					<!-- Elemen Media Yang Akaan Di Isi Oleh JS -->
					<img class="view_el" id="img_view">
					<audio class="view_el" id="audio_view" controls></audio>
					<video class="view_el" id="video_view" controls></video>
					<embed class="view_el" id="pdf_view" type="application/pdf"></embed>
					<iframe class="view_el" id="doc_view" frameborder="0"></iframe>
					<iframe class="view_el" id="yt_view" frameborder="0" allowfullscreen></iframe>

					<!-- Plain text -->
					<div class="view_el" id="text_view">
						<button class="btn_copy">Copy</button>
						<pre class="content_view"></pre>
					</div>
					<!-- Kode -->
					<div class="view_el" id="code_view">
						<button class="btn_copy" data-target="#code_view code">Copy</button>
						<pre>
							<code class="content_view"></code>
						</pre>
					</div>

					<!-- End Of Elemen Media Yang Akaan Di Isi Oleh JS -->

				</div>
			</div>

			<div class="modal-footer">
				<p id="caption_source"> Source : <span class="source_url"> </span> </p>
			</div>
		</div>
	</div>
</div>



<script type="text/javascript" src="{{asset('')}}asset/js/file.js"></script>
