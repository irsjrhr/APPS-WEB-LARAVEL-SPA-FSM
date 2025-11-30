<style type="text/css">
.btn_corner{
	color: #fff;
	font-size: 30px;
}
</style>

<section class="section_content" data-fungsi="profile">
	<div class="header_page">
		<h1>
			Profile
		</h1>
	</div>


	<!-- Container Content -->
	<div class="container-fluid container_content">
		<!-- Batas bungkus semua elemen content dibuat -->

		{{-- row profile --}}
		<div class="row row_profile">
			<button class="btn btn-primary btn_edit_profile" data-toggle="modal" data-target="#modal_update_profile">
				<i class="fas fa-pen"></i>
				Edit
			</button>
			<div class="profile_img text-center">
				<img id="source_file_profile" src="{{asset('')}}asset/gam/user.png">
			</div>
			<div class="col-md-6">
				<h4 class="text_title" id="nama">
					Irshandy Juniar Hardadi 
				</h4>
				<h5 class="text_info">
					User Id : <span id="user"> shandy28 </span>
				</h5>
				<h5 class="text_info">
					Level : <span id="level"> nama level </span>
				</h5>
			</div>
		</div>
		{{-- end of row profile --}}

		{{-- row info --}}
		<div class="row row_info">
			<div class="col-sm-12" style="margin-bottom: 0;">
				<h4 class="text_title mb-5">
					Personal Information
				</h4>
				<div class="container-fluid">

					<!-- Row Card Info -->
					<div class="row row_card_info">
						<div class="col-sm-3 col_card_info">
							<div class="card">
								<div class="card-body" >
									<p class="text_title"> Email </p>
									<p class="text_info" id="email"> user@gmail.com </p>
								</div>
							</div>
						</div>
						<div class="col-sm col_card_info">
							<div class="card">
								<div class="card-body">
									<p class="text_title"> Alamat </p>
									<p class="text_info" id="alamat">  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
									proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
								</div>
							</div>
						</div>
					</div>
					<!-- End Of Row Card Info -->


				</div>
			</div>

		</div>
		{{-- end of row info --}}

	</div>
	<!-- End Of Container Content -->

	<div class="modal fade" id="modal_update_profile" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Update Profile</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">


					<form class="form_file_upload" action="account" method="post">

						<div class="form-group">
							<label> Nama Lengkap : </label>
							<input autosave type="text" name="nama" class="form-control" required placeholder="Your Name">
						</div>

						<div class="form-group">
							<label> Email : </label>
							<input autosave type="text" name="email" class="form-control" required placeholder="Your Email">
						</div>

						<div class="form-group">
							<label> Alamat : </label>
							<textarea autosave type="text" name="alamat" class="form-control" required>
							</textarea>
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



