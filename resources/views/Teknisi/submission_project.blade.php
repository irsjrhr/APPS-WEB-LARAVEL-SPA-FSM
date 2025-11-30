

<section class="section_content" data-fungsi="submission_project">
	<div class="header_page">
		<h1>
			Submission Project
		</h1>
	</div>

	<div class="container-fluid">

		<div class="row">
			<!-- col maps -->
			<div class="col-sm-7 col_maps">
				<!-- Section monitoring maps -->
				<section class="monitoring_maps">

					<iframe id="maps" style="border:0;"loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade">
					</iframe>

				</section>
				<!-- End Of Section monitoring maps -->
			</div>
			<!-- End Of col_maps -->

			<!-- col_table -->
			<div class="col-sm col_table" style="max-width: 300px;">
				<table class="table table_option">
					<tr>
						<td style="display: flex;">
							<!-- 							<button class="btn btn-primary mr-2">
								<i class="fas fa-recycle"></i>
							</button> -->
							<!-- 							<button class="btn btn-default btn_tambah_data" data-toggle="modal" data-target="#modal_tambah">
								<i class="fas fa-plus"></i>
							</button> -->
							<!-- 							<button class="btn btn-warning btn_filter">
								<i class="fas fa-filter"></i>
							</button> -->
						</td>
						<!-- Form Search -->
						<td>
							<div class="container_option">
								<form id="form_search">
									<div class="form-group">
										<input type="text" class="form-control" name="search_keyword" placeholder="Masukkan ID Project">
									</div>
									<button class="btn btn-secondary btn_submit_opt">
										<i class="fas fa-search"></i>
									</button>
								</form>
							</div>
						</td>
						<!-- End Of Form Search -->

						<!-- Form Filter Status -->
						<!-- 						<td>
							<div class="container_option">
								<form class="form_filter" id="form_filter_status">
									<div class="form-group">
										<select class="form-control" name="filter_keyword">
											<option value="active"> Active </option>
											<option value="disabled"> Disabled </option>
										</select>
									</div>
									<button class="btn btn-warning btn_filter btn_submit_opt">
										<i class="fas fa-filter"></i>
									</button>
								</form>
							</div>
						</td> -->
						<!-- End Of Form Filter Status -->


					</tr>
				</table>


				<!-- card project - data_project -->
				<div class="card card_project data_project" data-row-project='{"lat":"-6.367221","long":"106.883712"}'>
					<div class="card-header">
						<h5> Info Project </h5>
						<i class="fas fa-info"></i>
					</div>
					<div class="card-body">
						<table class="table">
							<tbody>
								<tr class="row_project_judul">
									<th> Judul  </th> 	
									<td> Project 1  </td> 	
								</tr>
								<tr class="row_project_status">
									<th> Status  </th> 	
									<td> In Progress  </td> 	
								</tr>
							</tbody>

						</table>
						<style type="text/css">
						.button_action button{
							margin-bottom: 20px;
							width: 100%;
						}
					</style>
					<div class="button_action">
						<button class="btn btn-primary">
							Mulai
						</button>
						<button class="btn btn-success" data-toggle="modal" data-target="#modal_upload_laporan">
							Selesai
						</button>
					</div>

				</div>
			</div>
			<!-- end of card project -->

		</div>
		<!-- End Of col_table -->

	</div>
</div>



<!-- Modal Tambah -->
<div class="modal fade" id="modal_upload_laporan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Upload Laporan</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">


				<form class="form_file_upload" action="account" method="post">

					<div class="form-group">
						<label> Nama Laporan : </label>
						<input autosave type="text" name="nama" class="form-control" required placeholder="Your Name">
					</div>
					<div class="form-group">
						<label> Waktu Selesai : </label>
						<input autosave type="date" name="nama" class="form-control" required placeholder="Waktu Selesai ">
					</div>
					<div class="form-group">
						<label> Deskripsi Laporan : </label>
						<textarea style="height: 150px;" autosave name="nama" class="form-control" required placeholder="">
						</textarea>
					</div>
					<div class="form-group">
						<label> Upload File Laporan:</label>
						<div class='field_upload_custom' data-nama-idFile="" data-name-sourceFile=''>
							{{-- Ini Akan Diisi Oleh file.js --}}
						</div>
					</div>
					<div class="form-group">
						<button type="submit" name="submit" class="btn btn-success form-control">
							Submit
						</button>
					</div>
				</form>

			</div>
		</div>
	</div>
</div>

</section>


<script type="text/javascript">
	$(function() {
		SET_LAT_LONG('–6.21462', '106.845');
		maps_update();
	});
</script>
