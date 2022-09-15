<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArretController;
use App\Http\Controllers\TrajetController;
use App\Http\Controllers\CampusController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [ArretController::class, 'bvn']);

Route::get('/arret', [ArretController::class, 'arret']);

Route::get('/trajet', [TrajetController::class, 'trajet']);

Route::post('/trajet', [TrajetController::class, 'ajout']);

Route::get('/campus', [CampusController::class, 'campus']);



