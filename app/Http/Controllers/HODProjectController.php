<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class HODProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with(['user'])->get();

        return Inertia::render('hod/projects/index', [
            'projects' => $projects
        ]);
    }

    public function show($id): Response
    {
        $project = Project::findOrFail($id);

        return Inertia::render('hod/projects/show', [
            'project' => $project,
        ]);
    }
}