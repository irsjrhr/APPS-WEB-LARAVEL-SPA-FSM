<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin;
use App\Http\Controllers\Teknisi;
use App\Http\Controllers\User;
use App\Http\Controllers\Auth;

Route::get('/', function () {
    return view('welcome');
});

//+++++++++++++++++++ ADMIN ROUTE ++++++++++++++++++++
//=== Ini adalah route utama entry SPA Admin =======
Route::get('/admin', [ Admin::class, 'index' ]);
//=========================================
//=== Ini adalah route view fitur/method yang akan di akses oleh JS untuk melakukan SPA di index =======
Route::get('/admin/dashboard', [ Admin::class, 'dashboard' ]);
// Route Modul Account
Route::get('/admin/account', [ Admin::class, 'account' ]);
Route::get('/admin/level', [ Admin::class, 'level' ]);

Route::get('/admin/teknisi', [ Admin::class, 'teknisi' ]);
Route::get('/admin/project', [ Admin::class, 'project' ]);
Route::get('/admin/laporan', [ Admin::class, 'laporan' ]);
Route::get('/admin/monitoring', [ Admin::class, 'monitoring' ]);

Route::get('/admin/transaksi_kategori', [ Admin::class, 'transaksi_kategori' ]);
Route::get('/admin/transaksi_pemasukan', [ Admin::class, 'transaksi_pemasukan' ]);
Route::get('/admin/transaksi_pengeluaran', [ Admin::class, 'transaksi_pengeluaran' ]);
Route::get('/admin/transaksi_pembayaran', [ Admin::class, 'transaksi_pembayaran' ]);



//+++++++++++++++++++ TEKNISI ROUTE ++++++++++++++++++++

//=== Ini adalah route utama entry SPA Teknisi =======
Route::get('/teknisi', [ Teknisi::class, 'index' ]);
//=========================================================
//=== Ini adalah route view fitur/method yang akan di akses oleh JS untuk melakukan SPA di index =======
Route::get('/teknisi/dashboard', [ Teknisi::class, 'dashboard' ]);
// Route Modul Account
Route::get('/teknisi/project', [ Teknisi::class, 'project' ]);
Route::get('/teknisi/submission_project', [ Teknisi::class, 'submission_project' ]);


//+++++++++++++++++++ USER ROUTE ++++++++++++++++++++
//=== Ini adalah route utama entry SPA Teknisi =======
Route::get('/user', [ User::class, 'index' ]);
//=========================================================
//=== Ini adalah route view fitur/method yang akan di akses oleh JS untuk melakukan SPA di index =======
Route::get('/user/dashboard', [ User::class, 'dashboard' ]);
// Route Modul Account
Route::get('/user/profile', [ User::class, 'profile' ]);
Route::get('/user/project', [ User::class, 'project' ]);
Route::get('/user/tambah_project', [ User::class, 'tambah_project' ]);
Route::get('/user/monitoring', [ User::class, 'monitoring' ]);


//+++++++++++++++++++ AUTH ROUTE ++++++++++++++++++++
Route::get('/auth', [Auth::class, 'index']);
Route::get('/auth/set_sesi', [Auth::class, 'set_sesi']);
Route::get('/auth/logout', [Auth::class, 'logout']);










