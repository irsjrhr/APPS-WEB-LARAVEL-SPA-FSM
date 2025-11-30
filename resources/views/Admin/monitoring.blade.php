

<section class="section_content" data-fungsi="monitoring">
	<div class="header_page">
		<h1>
			Monitoring
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
							<button class="btn btn-primary mr-2">
								<i class="fas fa-recycle"></i>
							</button>
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
						<button class="btn btn-primary btn_lacak_project" style="width:100%">
							Lacak
						</button>
					</div>
				</div>
				<!-- end of card project -->


				<!-- card project - data_teknisi -->
				<div class="card card_project data_teknisi">
					<div class="card-header">
						<h5> Teknisi </h5>
						<i class="fas fa-info"></i>
					</div>
					<div class="card-body">
						<table class="table table_data">
							<thead>
								<tr class="row_header">
									<th> No </th>
									<th> ID </th>
									<th> Nama </th>
									<th> Last Update </th>
									<th> Action </th>
								</tr>
							</thead>
							<tbody>
								<tr class="row_teknisi" data-row-teknisi='{"lat":"-6.1753924","long":"106.827153"}'>
									<td> 1 </td>
									<td> #ID </td>
									<td> Irshandy </td>
									<td style="font-style: italic;"> 5 Menit </td>
									<td> 
										<button class="btn btn-primary btn_lacak_teknisi">
											Lacak
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!-- end of card project -->



			</div>
			<!-- End Of col_table -->

		</div>
	</div>



	<!-- Modal Tambah -->
	<div class="modal fade" id="modal_tambah" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Tambah Data</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">


					<form action="account" method="post">

						<div class="form-group">
							<label> Name : </label>
							<input autosave type="text" name="nama" class="form-control" required placeholder="Your Name">
						</div>

						<div class="form-group">
							<label> User : </label>
							<input autosave type="text" name="user" class="form-control" required>
						</div>

						<div class="form-group">
							<label> Email : </label>
							<input autosave type="text" name="email" class="form-control" required placeholder="Your Email">
						</div>

						<div class="form-group">
							<label> Input Select </label>
							<select class="form-control" name="level">
								<!-- Ini akan ditambahkan dengan jvascript -->
							</select>
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

