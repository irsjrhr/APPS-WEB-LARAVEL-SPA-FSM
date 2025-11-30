<?php 
$data_box_dashboard = [
	[
		"icon" => "fas fa-wallet",
		"banyak" => 0,
		"judul" => "Bill Spending"
	],
	[
		"icon" => "fas fa-project-diagram",
		"banyak" => 0,
		"judul" => "Total Project"
	],
];

?>

<section class="section_content" data-fungsi="dashboard">
	<div class="header_page">
		<h1>
			Dashboard
		</h1>
	</div>

	<div class="container-fluid">
		<!-- Row Sapaan Client + Shortcut -->
		<div class="row mb-4">
			<div class="col-12" style="padding: 0;">
				<div class="card p-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
					<div>
						<h4>Hai, User </h4>
						<p>Selamat datang di dashboard Anda.</p>
					</div>
					<div class="mt-2 mt-md-0">

						<button class="btn btn-primary btn_buat_pesanan">
							Buat Pesanan 
						</button>
						<button class="btn btn-primary">
							<i class="fas fa-recycle"></i>
						</button>

					</div>
				</div>
			</div>
		</div>

		<!-- Row Dashboard Boxes -->
		<div class="row row_box_dashboard">
			<div class="col-12 col_box_dashboard">
				<div class="scroll_dashboard">
					<div class="container-fluid">
						<div class="row row_dashboard_flex mb-4 flex-row flex-nowrap overflow-auto">


							@foreach ($data_box_dashboard as $row_box_dashboard)
							<div class="col-md-4 box_dashboard flex-shrink-0 mr-3">
								<div class="card text-center p-3">
									<i class="{{ $row_box_dashboard['icon']}} logo_back"></i>
									<h2 class="banyak_data"> {{ $row_box_dashboard['banyak']}}</h2>
									<h5> {{ $row_box_dashboard['judul']}} </h5>
								</div>
							</div>
							@endforeach

						</div>
					</div>
				</div>

			</div>
		</div>


		<!-- Row Grafik -->
		<div class="row">
			<div class="col-12" style="padding: 0;">
				<div class="card p-3">
					<h4>Stats Bill Spending</h4>
					<canvas id="chartTaskProgress" height="150"></canvas>
				</div>
			</div>
		</div>
	</div>
</section>



<script type="text/javascript">
	$(document).ready(function() {
		const data_bulan = [
		'Januari', 'Februari', 'Maret', 'April',
		'Mei', 'Juni', 'Juli', 'Agustus',
		'September', 'Oktober', 'November', 'Desember'
		];

		const data_tugas_selesai = [3000, 4000, 5000, 6000, 7000, 9000, 1000, 9000, 900, 1000, 5000, 0];

		const ctx = document.getElementById('chartTaskProgress').getContext('2d');
		new Chart(ctx, {
			type: 'bar',
			data: {
				labels: data_bulan,
				datasets: [{
					label: 'Bill Spending',
					data: data_tugas_selesai,
					backgroundColor: 'rgba(0, 123, 255, 0.7)',
					borderColor: 'rgba(0, 123, 255, 1)',
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				scales: { y: { beginAtZero: true } }
			}
		});
	});

	$(function() {
		$('body').on('click', '.btn_buat_pesanan', function() {
			load_page(BASE_URL_PAGE + 'user/tambah_project');
		});
	});

</script>
