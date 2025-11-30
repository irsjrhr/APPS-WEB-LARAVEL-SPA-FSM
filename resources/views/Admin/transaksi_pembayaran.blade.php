

<style type="text/css">
#modal_pembayaran{

}
#modal_pembayaran #caption_source{
	color: darkcyan;
	text-align: left;
}
#modal_pembayaran .container_modal_view{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 400px;
}
#modal_pembayaran .container_modal_view .view_el{
	width: 100%;
	height: 100%;
	position: relative;
}
</style>

<section class="section_content" data-fungsi="transaksi_pembayaran">
	<!-- Main content -->

	<div class="header_page">
		<h1>
			Atur Transaksi Pembayaran
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
										<input type="text" class="form-control" name="search_keyword" placeholder="By Nama Item, Email Pembeli, Nama Pembeli">
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
							<th> #ID Pembayaran </th>
							<th> User Admin </th>
							<th> Nama Item </th>
							<th> Harga </th>
							<th> QTY </th>
							<th> Total Harga </th>
							<th> Nama Pembeli </th>
							<th> Alamat Pembeli </th>
							<th> Email Pembeli </th>
							<th> Waktu Bayar </th>
							<th> OrderID Midtrans </th>
							<th> Status Pembayaran </th>
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
					<h5 class="modal-title" id="exampleModalLabel"> Form Tambah Transaksi Pembayaran </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form method="post" action="transaksi_pembayaran" style="overflow: auto;max-height: 500px;padding-bottom: 100px;">

						<div class="form-group">
							<label> Nama Item : </label>
							<input type="text" name="nama_item" class="form-control" required placeholder="Nama Item">
						</div>

						<div class="form-group">
							<label> Harga : </label>
							<input type="number" name="harga" id="harga" class="form-control" required placeholder="Harga">
						</div>

						<div class="form-group">
							<label> Jumlah (Qty) : </label>
							<input type="number" name="qty" id="qty" class="form-control" required placeholder="Jumlah">
						</div>

						<div class="form-group">
							<label> Nama Pembeli : </label>
							<input type="text" name="nama_pembeli" class="form-control" required placeholder="Nama Pembeli">
						</div>

						<div class="form-group">
							<label> Alamat Pembeli : </label>
							<textarea class="form-control" name="alamat_pembeli" required placeholder="Alamat Pembeli"></textarea>
						</div>

						<div class="form-group">
							<label> Email Pembeli : </label>
							<input type="email" name="email_pembeli" class="form-control" required placeholder="Email Pembeli">
						</div>

						<div class="form-group">
							<label> Waktu Bayar : </label>
							<input type="date" name="waktu_bayar" class="form-control" required>
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
	<!-- End Of Modal -->

	<!-- Modal Update -->
	<div class="modal fade" id="modal_update" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel"> Form Update Transaksi Pembayaran </h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<form method="post" action="transaksi_pembayaran" style="overflow: auto;max-height: 500px;padding-bottom: 100px;">

						<div class="form-group">
							<label> Nama Item : </label>
							<input type="text" name="nama_item" class="form-control" required placeholder="Nama Item">
						</div>

						<div class="form-group">
							<label> Harga : </label>
							<input type="number" name="harga" id="harga" class="form-control" required placeholder="Harga">
						</div>

						<div class="form-group">
							<label> Jumlah (Qty) : </label>
							<input type="number" name="qty" id="qty" class="form-control" required placeholder="Jumlah">
						</div>

						<div class="form-group">
							<label> Nama Pembeli : </label>
							<input type="text" name="nama_pembeli" class="form-control" required placeholder="Nama Pembeli">
						</div>

						<div class="form-group">
							<label> Alamat Pembeli : </label>
							<textarea class="form-control" name="alamat_pembeli" required placeholder="Alamat Pembeli"></textarea>
						</div>

						<div class="form-group">
							<label> Email Pembeli : </label>
							<input type="email" name="email_pembeli" class="form-control" required placeholder="Email Pembeli">
						</div>

						<div class="form-group">
							<label> Waktu Bayar : </label>
							<input type="date" name="waktu_bayar" class="form-control" required>
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
	<!-- End Of Modal -->

	<!-- Modal View Bayar -->
	<div class="modal fade" id="modal_pembayaran" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
					<div class="loader_page loader_pembayaran" style="position:absolute;left: 0;top: 0;"></div>
					<div class="container_modal_view" style="position:relative;">
						<!-- Elemen Media Yang Akaan Di Isi Oleh JS -->
						<iframe class="view_el" id="midtrans_view" frameborder="0" allowfullscreen></iframe>
						<!-- End Of Elemen Media Yang Akaan Di Isi Oleh JS -->
					</div>
				</div>

				<div class="modal-footer">
					<p id="caption_source"> Source : <span class="source_url"> </span> </p>
				</div>
			</div>
		</div>
	</div>


	<!-- End Of Main content -->

</section>

