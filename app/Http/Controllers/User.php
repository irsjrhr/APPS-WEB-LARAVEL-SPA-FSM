<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Base_model;

class User extends Controller{

    public function __construct(){
        $this->Base_model = new Base_model();
    }

    //View untuk sidebar main container 
    public function index(){
        $Menu = new Menu();
        $data_sidebar = $Menu->SET_SIDEBAR_MENU();
        $data_modal_menu = $Menu->SET_MODAL_MENU();

        $data = [];
        $data['data_modal_menu'] = $data_modal_menu;
        $data['data_sidebar'] = $data_sidebar;
        return view('User/index', $data);
    }

    //+++++++ Method dibawah akan ditampilkan dengan asynchronous SPA pada javascript melalui index +++++++++++
    public function dashboard(){  
        $data = [];
        return view( 'User/dashboard', $data );
    }
    public function profile(){
        $data = [];
        return view( 'User/profile', $data);
    }
    public function project(){
        $data = [];
        return view( 'User/project', $data);
    }
    public function tambah_project(){
        $data = [];
        return view( 'User/tambah_project', $data);
    }
    public function monitoring(){  
        $data = [];
        return view( 'User/monitoring', $data );
    }
}
class Menu{

    public $data_sidebar;
    public $data_modal_menu;
    // ++++++++++++++++++++++ METHOD TERKAIT DATA SIDEBAR MENU DI ADMIN +++++
    public function ADD_MODUL_MENU( $nama_modul, $data_menuModulParam = [] ){
        $data_menuModul = [
            [ "menu" => $nama_modul, "icon" => "fas fa-arrow-right", "url" => "batas" ]
        ];
        $data_menuModul = array_merge( $data_menuModul, $data_menuModulParam );
        $this->data_sidebar = array_merge( $this->data_sidebar, $data_menuModul );
    }
    public function SET_SIDEBAR_MENU(){

        $this->data_sidebar = [ 
            [ "menu" => "Dashboard", "icon" => "fas fa-th-large", "url" => asset("user/dashboard") ],
        ];
        //++++ Menambahkan modul menu course 
        $this->ADD_MODUL_MENU( 'Modul FSM', [
            [ "menu" => "Profile", "icon" => "fas fa-user", "url" => asset("user/profile") ],
            [ "menu" => "List Project", "icon" => "fas fa-tasks", "url" => asset("user/project") ],
            [ "menu" => "Buat Project", "icon" => "fas fa-plus", "url" => asset("user/tambah_project") ],
            [ "menu" => "Monitoring Project", "icon" => "fas fa-file-alt", "url" => asset("user/monitoring") ],
        ]);

        return $this->data_sidebar;
    }
    public function SET_MODAL_MENU(){
        $this->data_modal_menu =  [
            [ "menu" => "Admin", "icon" => "fas fa-users", "url" => asset("admin/") ],
            [ "menu" => "Teknisi", "icon" => "fas fa-users", "url" => asset("teknisi/") ],
            [ "menu" => "User", "icon" => "fas fa-users", "url" => asset("user/") ],
            [ "menu" => "Logout", "icon" => "fas fa-sign-out-alt", "url" => asset("auth/logout") ],
        ];
        return $this->data_modal_menu;
    }

}




