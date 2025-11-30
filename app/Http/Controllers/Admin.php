<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Base_model;

class Admin extends Controller{

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
        return view('Admin/index', $data);
    }

    //+++++++ Method dibawah akan ditampilkan dengan asynchronous SPA pada javascript melalui index +++++++++++
    public function dashboard(){  
        $data = [];
        return view( 'Admin/dashboard', $data );
    }
    public function account(){  
        $data = [];
        return view( 'Admin/account', $data );
    }
    public function level(){
        $data = [];
        return view( 'Admin/level', $data);
    }   
    public function teknisi(){
        $data = [];
        return view( 'Admin/teknisi', $data);
    }
    public function project(){
        $data = [];
        return view( 'Admin/project', $data);
    }
    public function laporan(){
        $data = [];
        return view( 'Admin/laporan', $data);
    }
    public function monitoring(){
        $data = [];
        return view( 'Admin/monitoring', $data);
    }

    // +++++++++ Modul Aplikasi Keuangan +++++++
    public function transaksi_kategori(){   
        $data = [];
        return view( 'Admin/transaksi_kategori', $data );
    }

    public function transaksi_pemasukan(){  
        $data = [];
        return view( 'Admin/transaksi_pemasukan', $data );
    }
    public function transaksi_pengeluaran(){    
        $data = [];
        return view( 'Admin/transaksi_pengeluaran', $data );
    }
    public function transaksi_pembayaran(){ 
        $data = [];
        return view( 'Admin/transaksi_pembayaran', $data );
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
            [ "menu" => "Dashboard", "icon" => "fas fa-th-large", "url" => asset("admin/dashboard") ],
        ];
        //++++ Menambahkan modul menu account 
        $this->ADD_MODUL_MENU( 'Modul Account', [
            [ "menu" => "Atur Level", "icon" => "fas fa-key", "url" => asset("admin/level") ],
            [ "menu" => "Atur Account", "icon" => "fas fa-users", "url" => asset("admin/account") ]
        ]);
        //++++ Menambahkan modul menu fsm 
        $this->ADD_MODUL_MENU( 'Modul FSM', [
            [ "menu" => "Atur Teknisi", "icon" => "fas fa-hard-hat", "url" => asset("admin/teknisi") ],
            [ "menu" => "Atur Project", "icon" => "fas fa-tasks", "url" => asset("admin/project") ],
            [ "menu" => "Atur Laporan", "icon" => "fas fa-file-alt", "url" => asset("admin/laporan") ],
            [ "menu" => "Monitoring", "icon" => "fas fa-tv", "url" => asset("admin/monitoring") ],
        ]);
        //++++ Menambahkan modul menu keuangan 
        $this->ADD_MODUL_MENU( 'Modul Keuangan', [
            [ "menu" => "Atur Transaksi Kategori", "icon" => "fas fa-filter", "url" => asset("admin/transaksi_kategori") ],
            [ "menu" => "Atur Pemasukan", "icon" => "fas fa-cash-register", "url" => asset("admin/transaksi_pemasukan") ],
            [ "menu" => "Atur Pengeluaran", "icon" => "fas fa-money-bill", "url" => asset("admin/transaksi_pengeluaran") ],
            [ "menu" => "Atur Pembayaran", "icon" => "fas fa-cash-register", "url" => asset("admin/transaksi_pembayaran") ],
        ]);

        return $this->data_sidebar;
    }


    public function SET_MODAL_MENU(){
        $this->data_modal_menu =  [
            [ "menu" => "Admin", "icon" => "fas fa-users", "url" => asset("admin/") ],
            [ "menu" => "User", "icon" => "fas fa-users", "url" => asset("user/") ],
            [ "menu" => "Logout", "icon" => "fas fa-sign-out-alt", "url" => asset("auth/logout") ],
        ];
        return $this->data_modal_menu;
    }

}



