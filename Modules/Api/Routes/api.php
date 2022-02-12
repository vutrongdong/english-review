<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['dbtransaction', 'auth_api'])->group(function() {
    Route::get('/cities', 'CommonController@getCities')->name('list_city');
    Route::get('/districts/{city_id}', 'CommonController@getDistricts')->name('list_district');

    // users
    Route::prefix('/users')->name('users.')->group(function () {
        Route::get('/', 'UserController@index')->name('list');
        Route::get('/{id}', 'UserController@info')->where('id', '[0-9]+')->name('info');
        Route::delete('/{id}', 'UserController@delete')->middleware(['permissions:admin'])->where('id', '[0-9]+')->name('delete');
        Route::post('/create', 'UserController@create')->name('create');
        Route::put('/edit', 'UserController@edit')->name('edit');
        Route::post('/profile', 'UserController@updateProfile')->name('update_profile');
    });
    // categories
    Route::prefix('/categories')->name('categories.')->group(function () {
        Route::get('/', 'CategoryController@index')->name('list');
        Route::get('/{id}', 'CategoryController@info')->where('id', '[0-9]+')->name('info');
        Route::delete('/{id}', 'CategoryController@delete')->middleware(['permissions:admin'])->where('id', '[0-9]+')->name('delete');
        Route::post('/create', 'CategoryController@create')->name('create');
        Route::put('/edit', 'CategoryController@edit')->name('edit');
    });
    // blogs
    Route::prefix('/blogs')->name('blogs.')->group(function () {
        Route::get('/{id}', 'BlogController@info')->where('id', '[0-9]+')->name('info');
        Route::delete('/{id}', 'BlogController@delete')->middleware(['permissions:admin'])->where('id', '[0-9]+')->name('delete');
        Route::post('/create', 'BlogController@create')->name('create');
        Route::post('/edit', 'BlogController@edit')->name('edit');
        Route::post('/upload', 'BlogController@upload')->name('upload');
    });

    // tests
    Route::prefix('/tests')->name('tests.')->group(function () {
        Route::get('/{id}', 'TestController@show')->where('id', '[0-9]+')->name('show');
        Route::delete('/{id}', 'TestController@delete')->middleware(['permissions:admin'])->where('id', '[0-9]+')->name('delete');
        Route::post('/create', 'TestController@create')->name('create');
        Route::put('/edit', 'TestController@edit')->name('edit');
    });
});


Route::middleware('token_api')->group(function() {
    // authen api for web
    Route::post('/auth/register', 'UserController@register');
    Route::get('/auth/user', 'UserController@getUserAuth')->name('getUserAuth');
    Route::post('/auth/login', '\App\Http\Controllers\Auth\LoginController@login');
    Route::post('/auth/logout', '\App\Http\Controllers\Auth\LoginController@logoutApi');
    Route::post('/auth/update_password', 'UserController@updatePassword')->name('update_password');
    Route::post('/auth/password/email', '\App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('/auth/password/reset', '\App\Http\Controllers\Auth\ResetPasswordController@reset');
    // Send Email contact
    Route::post('/email_contact', 'EmailController@emailContact')->name('email_contact');
    // Search vocabulary
    Route::get('/search_vocabulary/{keyword}', 'WebController@searchVocabulary')->name('search_vocabulary');
    // Get blog by slug
    Route::get('/blogs/{slug}', 'BlogController@getBySlug');
    Route::get('blogs/', 'BlogController@index');
    // Get test by slug
    Route::get('tests/', 'TestController@index')->name('list');
    Route::get('/tests/{slug}', 'TestController@getBySlug');
});
