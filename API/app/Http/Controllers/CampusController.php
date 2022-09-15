<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



class CampusController extends Controller
{
    public function campus() {
        $results = DB::table('CAMPUS')->get();
        return response()->json($results);
    }}