<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



class TrajetController extends Controller {

    public function trajet() {
        $results = DB::table('TRAJET')->get();
            // ->join('CAMPUS', 'TRAJET.ID_CAMPUS_DEPART', '=', 'CAMPUS.ID_CAMPUS')
            
        return response()->json($results);
    }



    public function ajout(Request $request) {

        // $validator = Validator::make($request->all(), [
        //     'dir' => ['required', 'alpha'],
        //     'nbPlaces' => ['required','numeric'],
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(["status"=>0, "message"=>$validator->errors()]);
        // }
        
        $timestamp = strtotime($request->time);
        $d = date("Y-m-d", $timestamp);
        $date = $d .' '. $request->date;

        // return response()->json(["arrivee depart"=>$request->arrivee, "places"=>$request->nbPlaces, "date"=>$date]);
        
        if ($request->dir == "Direction Campus") {
            
            $exist =  DB::table('TRAJET')->where([
                ['ID_CAMPUS_ARRIVEE','=', $request->arrivee],
                ['NB_PLACES', '=', $request->nbPlaces],
                ['HEURE_DEP', '=', $date],
                ['ID_UTILISATEUR', '=', 1]
            ])->get();
            
            if ($exist) {
                return response()->json(["status"=>0, "message"=>"Trajet existe déjà"]);
            } else {
                DB::table('TRAJET')->insert(['ID_CAMPUS_ARRIVEE' => $request->arrivee, 'NB_PLACES' => $request->nbPlaces, 'HEURE_DEP' => $date, 'ID_UTILISATEUR' => 1]);
                
                $ok = DB::table('TRAJET')->where([
                    ['ID_CAMPUS_ARRIVEE','=', $request->arrivee],
                    ['NB_PLACES', '=', $request->nbPlaces],
                    ['HEURE_DEP', '=', $date],
                    ['ID_UTILISATEUR', '=', 1]
                ])->get();
    
                if($ok) {
                    return response()->json(["status"=>1, "message"=>"Trajet ajouté"]);
                } else {
                    return response()->json(["status"=>0, "message"=>"problème lors de l'ajout"]);
                }
            }
        } else if ($request->dir == "Direction Maison") {
        
            DB::table('TRAJET')->insert(['ID_CAMPUS_DEPART' => $request->depart, 'NB_PLACES' => $request->nbPlaces, 'HEURE_DEP' => $date, 'ID_UTILISATEUR' => 1]);

            $ok = DB::table('TRAJET')->where([
                ['ID_CAMPUS_DEPART','=', $request->depart],
                ['NB_PLACES', '=', $request->nbPlaces],
                ['HEURE_DEP', '=', $date],
                ['ID_UTILISATEUR', '=', 1]
            ])->get();

            if($ok) {
                return response()->json(["status"=>1, "message"=>"Trajet ajouté"]);
            } else {
                return response()->json(["status"=>0, "message"=>"problème lors de l'ajout"]);
            }
        }
    }
}