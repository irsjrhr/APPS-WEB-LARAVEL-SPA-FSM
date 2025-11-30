<!-- Modal Menu -->
<div class="modal fade" id="modal_menu" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel"> Mau Ke Mana ? </h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="container-fluid container_modal_menu">
					<div class="row justify-content-center">


						@foreach ($data_modal_menu as $row_modal_menu)
						<!-- Col Modal Menu -->
						<div class="col-sm-5 col_modal_menu">
							<a href="{{ $row_modal_menu['url'] }}">
								<div class="container-fluid">
									<div class="row row_modal_menu">
										<div class="col_logo col-3">
											<i class="{{ $row_modal_menu['icon'] }}"></i>
										</div>
										<div class="col">
											{{ $row_modal_menu['menu'] }}
										</div>
									</div>
								</div>
							</a>
						</div>
						<!-- End Of Col Modal Menu -->
						@endforeach

					</div>
				</div>

			</div>

		</div>
	</div>
</div>

<!-- End Of Modal Menu -->
