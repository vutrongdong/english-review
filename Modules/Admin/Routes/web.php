<?php
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix("/".config('app.prefix_url'))->middleware('permissions:admin,writer')->group(function() {
    Route::group(['middleware' => 'auth'], function() {
        Route::get('/{path?}', [
            'uses' => 'AdminController@index',
            'as' => 'react',
            'where' => ['path' => '^((?!api).)*$']
        ])->name('admin.index');
    });
});
