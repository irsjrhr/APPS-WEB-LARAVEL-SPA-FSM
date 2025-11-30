
<!doctype html>
	<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/style.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/panel.css">
		<link rel="stylesheet" type="text/css" href="{{asset('')}}asset/css/panel_user.css">
		<title> User Panel </title>
	</head>
	<body>

		<style type="text/css">	
		.content .nav_header .col_left{
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.responsive_content{
			display: flex !important;
		}
		.link_menu .row_menu.active{
			background: #007bff;
		}
	</style>


	<header class="header_admin_page">
		<!-- Nav nav_header -->
		<nav class="nav_header not_inherit_sidebar">
			<div class="container-fluid">
				<div class="row">
					<!-- Col Left' -->
					<div class="col col_left">
						<div class="responsive_content">
							<div class="content">
								<div class="col_content">
									<span class="btn_sidebar">
										<i class="fas fa-bars"></i>
									</span>
								</div>
								<div class="col_content">
									<a href="{{asset('')}}">
										<img src="{{asset('')}}asset/gam/logo.png" class="logo_sidebar">
									</a>
								</div>
								<div class="col_content title_app">
									<h4> 
										FSM - User
									</h4>
								</div>
							</div>
						</div>
					</div>
					<!-- End Of Col Left' -->
					<!-- Col Right' -->
					{{-- INI AKAN DIUBAH OTOMATIS DI api.js --}}
					<div class="col col_right">
						<div class="box_profile" data-toggle="modal" data-target="#modal_menu">
							<img src="{{asset('')}}asset/gam/user.png" class="img_profile">
							<div class="info_profile">
								<div class="info_user text_flow_multi1">
									Nama Account
								</div>
								<div class="info_role">
									Level Account
								</div>
							</div>
						</div>
					</div>
					{{-- INI AKAN DIUBAH OTOMATIS DI api.js --}}
					<!-- End Of Col Right' -->

				</div>
			</div>
		</nav>
		<!-- End Of Nav nav_header -->

	</header>

	<!-- Container page -->
	<div class="container-fluid container_page">
		<!-- Row page -->
		<div class="row row_page">
			<!-- Sidebar -->
			<div class="col_sidebar">
				<div class="sidebar">
					<button class="btn btn-default btn_close">
						<i class="fas fa-times"></i>
					</button>
					<div class="container-fluid">

						<!-- Row Header -->
						<!-- 						<div class="row row_header">
							<div class="col-12">
								<img src="{{asset('')}}asset/gam/logo.png" class="logo_sidebar">
								<button class="btn btn-default btn_close">
									<i class="fas fa-times"></i>
								</button>
								<h1 class="logo_font"> 
									App - Admin
								</h1>
							</div>
						</div> -->
						<!-- End Of Row Header -->

						@foreach ($data_sidebar as $row_sidebar)

						@if ($row_sidebar['url'] != 'batas')
						{{-- Ini Adalah Ketika Link Menu --}}
						<div data-page="{{ $row_sidebar['url'] }}" class="link_menu">
							<div class="row row_menu">
								<div class="col-3 menu_logo">
									<i class="{{ $row_sidebar['icon'] }}"></i>
								</div>
								<div class="col menu_text">
									{{ $row_sidebar['menu'] }}
								</div>
							</div>
						</div>

						@elseif ($row_sidebar['url'] == 'batas')
						{{-- Ini Adalah Ketika Batas Menu --}}
						<div class="link_batas">
							<div class="row row_menu">
								<div class="col-1 menu_logo">
									<i class="{{ $row_sidebar['icon'] }}"></i>
								</div>
								<div class="col menu_text">
									{{ $row_sidebar['menu'] }}
								</div>
							</div>
						</div>

						@endif

						@endforeach



						<!-- End Of link_menu -->

					</div>
				</div>
			</div>
			<!-- End Of Sidebar -->
			<!-- Content -->
			<div class="col content">

				<!-- Load animasi - akan muncul dan menghilang sesuai dengan perilaku load_page  -->
				<div class="animasi_loadPage">
					<div class="content_load">
						<div class="container-fluid">
							<div class="row">
								<div class="col-12">
									<img src="{{asset('')}}asset/gam/load.gif">
									<p class="text_load">
										<!-- Diisi oleh js  -->
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- End Of Load animasi - akan muncul dan menghilang sesuai dengan perilaku load_page  -->


				<main class="main_container"> 
					<!-- Di Load Ajax di admin.js -->
