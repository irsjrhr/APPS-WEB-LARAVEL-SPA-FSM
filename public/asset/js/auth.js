$(document).ready(function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		var form = $(this);
		var data_post = form.serialize();
		var url_endpoint = URL_SERVICE_CI + "account/post_login"
		loader_page('show');
		post_API( url_endpoint, data_post, function(response) {

			console.log( response );
			loader_page('hide', null);
			var msg = response.msg;
			Swal.fire( msg );

			if ( response.status == true ) {
				//Kalo berhasil maka responsenya ada row_db berupa data row untuk user 
				var row_user_db = response.row_db;
				var user_db = row_user_db.user;
				var level_db = row_user_db.level;
				var source_file_profile = row_user_db.source_file_profile;
				window.location.href = BASE_URL_PAGE + `auth/set_sesi?user=${user_db}&level=${level_db}&source_file_profile=${source_file_profile}`;
			}

		});
	});
});