<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Base_model;

class Auth extends Controller{
    public function __construct(){
        $this->Base_model = new Base_model;
    }
    public function index(){
        return view('Auth/index');
    }
    public function set_sesi( Request $req ){
        $user = $req->input('user');
        $level = $req->input('level');
        $source_file_profile = $req->input('source_file_profile');
        $this->Base_model->set_sesi_login( $user, $level, $source_file_profile );
        return redirect('/admin');
    }
    public function logout(){
        $this->Base_model->remove_sesi_login();
        return redirect('/auth');
    }




}
