<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



class ArretController extends Controller
{
    public function bvn() {
        return response()->json(["message"=>"Bienvenue dans l'API de Co'Hop", "Arrêts"=>"http://exilieloan.fr/APICoHop/public/api/arret", "trajet"=>"http://exilieloan.fr/APICoHop/public/api/trajet", "campus"=>"http://exilieloan.fr/APICoHop/public/api/campus"]);
    }

    // public function arrets(Request $request) {
    //     $search = $request->search;
    //     if ($search === null) {
    //         $arrets = Arret::select("id", "nom", "lat", "lon")->get();
    //         return response()->json($arrets);
    //     } else {
    //         $arrets = Arret::select("id", "nom", "lat", "lon")->where("nom", "like", "%$search%")->get();
    //         return response()->json($arrets);
    //     }
    // }

    // public function arret($id) {
    //     $arret = Arret::select("id", "nom", "lat", "lon")->where("id","=",$id)->get();
    //     if ($arret->count() > 0) {
    //         return response()->json($arret);
    //     } else {
    //         return response()->json(["status"=>0, "message"=>"cet arret n'existe pas"]);
    //     }
    // }

    public function arret() {
        $results = DB::table('ARRET')->get();
        return response()->json($results);
    }
}
