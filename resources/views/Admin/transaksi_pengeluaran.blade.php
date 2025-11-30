<section class="section_content" data-fungsi="transaksi_pengeluaran">
	<!-- Main content -->

	<div class="header_page">
		<h1>
			Atur Transaksi Pengeluaran
		</h1>
	</div>

	<div class="container-fluid">
		<div class="row mb-4">
			<!-- Box Dashboard -->
			<div class="col-md-5 box_dashboard">
				<div class="card">
					<i class="fas fa-info logo_back"></i>
					<h2 class="banyak_data"> 0 </h2>
					<h3> Transaksi </h3>
				</div>
			</div>
			<!-- End Of Box Dashboard -->
		</div>

		<div class="row">
			<div class="col-12" style="max-width: 300px;">
				<table class="table table_option">

					<tr>
						<td style="display: flex;">
							<button class="btn btn-primary btn_load mr-2">
								<i class="fas fa-recycle"></i>
							</button>
							<button class="btn btn-default btn_tambah_data" data-toggle="modal" data-target="#modal_tambah">
								<i class="fas fa-plus"></i>
							</button>
						</td>
						<!-- Form Search -->
						<td>
							<div class="container_option">
								<form id="form_search">
									<div class="form-group">
										<input type="text" class="form-control" name="search_keyword" placeholder="By Nama Transaksi">
									</div>
									<button class="btn btn-secondary btn_submit_opt">
										<i class="fas fa-search"></i>
									</button>
								</form>
							</div>
						</td>
						<!-- End Of Form Search -->

						<!-- Form Filter Status -->
						<td>
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
						</td>
						<!-- End Of Form Filter Status -->

					</tr>
				</table>
				<table class="table table_data">

					<thead>
						<tr class="row_header">
							<td> <i class="fas fa-cog"></i> </td>
							<th> No </th>
							<th> ID </th>
							<th> Kategori </th>
							<th> User Admin </th>
							<th> Nama Transaksi </th>
							<th> Nominal </th>
							<th> Catatan </th>
							<th> Dokumentasi </th>
							<th> Waktu Transaksi </th>
							<th> Waktu </th>
							<th> Status </th>
						</tr>
					</thead>
					<tbody>
						<!-- Ditambahakam oleh jquery berdarsarkan data loadnya  -->
					</tbody>

				</table>
			</div>
		</div>
	</div>

	<!-- Modal Tambah -->
	<div class="modal fade" id="modal_tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> Form Tambah Data </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form class="form_file_upload" method="post" action="transaksi_pengeluaran" style="overflow: auto;max-height: 500px;padding-bottom: 100px;">

						<div class="form-group">
							<label> Transaksi Kategori : </label>
							<select class="form-control" name="id_transaksi_kategori">
								<!-- Ini akan ditambahkan dengan jvascript -->
							</select>
						</div>
						<div class="form-group">
							<label> Nama Transaksi : </label>
							<input autosave type="text" name="nama_transaksi" class="form-control" required placeholder="Nama Transaksi">
						</div>
						<div class="form-group">
							<label> Nominal Transaksi : </label>
							<input autosave type="number" name="nominal_transaksi" class="form-control" required placeholder="Nominal Transaksi">
						</div>
						<div class="form-group">
							<label> Catatan Transaksi : </label>
							<textarea class="form-control" name="catatan_transaksi"></textarea>
						</div>
						<div class="form-group">
							<label> Waktu Transaksi : </label>
							<input autosave type="date" name="waktu_transaksi" class="form-control" required>
						</div>


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

	<!-- End Of Main content -->

</section>