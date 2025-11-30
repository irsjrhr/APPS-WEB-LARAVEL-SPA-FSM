
<!doctype html>
	<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/style.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/auth.css">
		<title> Auth </title>
	</head>
	<body>
		<div class="loader_page">
			<!-- Diisi oleh JS fungsi loader_page() -->
		</div>
		<main>
			<div class="container-fluid">
				<div class="row">
					{{-- Col Login Form --}}
					<div class="col-md col_login_form" style="padding: 0;">
						<!-- Section Form -->
						<section class="section_form">
							<div class="container-fluid">
								<div class="row justify-content-center">
									<div class="col-md-9 col_container">
										<img src="{{asset('')}}asset/gam/logo.png" class="logo_login">
										<h2 class="title_login"> Sign In </h2>

										<form action="panelUser_dashboard.php" method="post">
											<div class="form-group">
												<label> User / Email Address </label>
												<input type="text" class="form-control" name="user">
											</div>
											<div class="form-group">
												<label> Password </label>
												<input type="text" class="form-control" name="password">
											</div>
											<div class="form-group text-right">
												<a href="" class="lupa_password"> Lupa Password </a>
											</div>

											<div class="button_section">
												<div class="form-group">
													<button class="btn btn-success form-control">
														Masuk
													</button>
												</div>
												<!-- 												<div class="form-group">
													<a href="sign.php" class="btn btn-secondary form-control">
														Daftar Akun
													</a>
												</div> -->
											</div>

										</form>
									</div>
								</div>
							</div>
						</section>
						<!-- End Of Section Form -->
					</div>	
					{{-- End Of Col Login Form --}}
					<div class="img_banner">
						<img src="{{asset('')}}asset/gam/banner_login.png">
					</div>
				</div>
			</div>
		</main>

		<script src="{{asset('')}}asset/js/jquery.min.js"></script>
		<script type="text/javascript" src="{{asset('')}}asset/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="{{asset('')}}asset/js/api.js"></script>
		<script src="{{asset('')}}asset/js/sweetalert2.js"></script>
		<script src="{{asset('')}}asset/js/auth.js"></script>
	</body>
	</html>


