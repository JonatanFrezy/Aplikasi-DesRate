<?php

namespace App\Http\Controllers\HOD;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;

class ResponseController extends Controller
{
    public function index()
    {
        $projects = Project::with('responses')
    ->where('user_id', Auth::id())
    ->get();
        return view('hod.response.index', compact('projects'));
    }
}