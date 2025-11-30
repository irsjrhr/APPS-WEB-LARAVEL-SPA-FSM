<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Base_model extends Model{

    public 
    $key_sesi_user = "user_login",  
    $key_sesi_level = "level_login",
    $key_sesi_img = "source_file_profile";

    public function __construct(){
    }   

    // ++++++++++++++++++++++ METHOD TERKAIT DATA SIDEBAR MENU DI PANEL +++++
    public function random_persen($i){

        $rand_p = rand( 0, 100 );
        if ( $rand_p >= 100 ) {
            return $rand_p;
        }else{
            $hasil = $rand_p + $i;
            $kelebihan = $hasil - 100;
            if ( $kelebihan >= 0 ) {
            //Biar dipasin jadi 100 batas maksimal progress 
                $hasil = $hasil - $kelebihan;
            }
            return $hasil;

        }
    }
    public function set_url( $controller ){
        //Method untuk membuat url pada data basis menu
        return asset('') . $controller;
    }
    public function waktu(){
        return date('Y-m-d');
    }
    public function status(){
        return 'ACTIVE';
    }


    //=========== Method Helper Untuk Mealakukan Sesi Login =========================
    public function set_sesi_login( $user, $level, $source_file_profile ){

        //Membuat sesi di sisi server dan sesi localstorage di sisi client 

        $key_sesi_user = $this->key_sesi_user;  
        $key_sesi_level = $this->key_sesi_level;
        $key_sesi_img = $this->key_sesi_img;

        $data_set_session = [
            $key_sesi_user => $user,
            $key_sesi_level => $level,
            $key_sesi_img => $source_file_profile,
        ];

        //Set sesi di sisi server
        session( $data_set_session );

        // Set localstorage di sisi client 
        echo "
        <script>
        localStorage.setItem('$key_sesi_user', '$user');
        localStorage.setItem('$key_sesi_level', '$level');
        localStorage.setItem('$key_sesi_img', '$source_file_profile');
        </script>
        ";
    }
    public function remove_sesi_login(){

        $key_sesi_user = $this->key_sesi_user;  
        $key_sesi_level = $this->key_sesi_level;
        $key_sesi_img = $this->key_sesi_img;

        // Menghapus sesi localStorage di sisi client
        session()->forget($key_sesi_user);
        session()->forget($key_sesi_level);
        session()->forget($key_sesi_img);

        echo "
        <script>
        localStorage.removeItem('$key_sesi_user');
        localStorage.removeItem('$key_sesi_level');
        localStorage.removeItem('$key_sesi_img');
        </script>";
    }
}



