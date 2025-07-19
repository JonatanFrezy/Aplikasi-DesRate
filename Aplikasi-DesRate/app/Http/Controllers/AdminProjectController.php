<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminProjectController extends Controller
{
    public function index(): Response
    {
        $projects = Project::with(['user'])->get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'pm_name' => 'required|string|max:255',
            'team_members' => 'required|string',
            'pic_name' => 'required|string|max:255',
            'pic_email' => 'required|email|max:255',
            'pic_phone' => ['required', 'regex:/^(\+62|62|0)[0-9\s\-]{8,14}$/', 'max:15'],
        ]);

        Project::create([
            'title' => $request->title,
            'pm_name' => $request->pm_name,
            'team_members' => $request->team_members,
            'pic_name' => $request->pic_name,
            'pic_email' => $request->pic_email,
            'pic_phone' => $request->pic_phone,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('projects.index')->with('success', 'Pekerjaan berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        $project = Project::findOrFail($id);

        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'pm_name' => 'required|string|max:255',
            'team_members' => 'required|string',
            'pic_name' => 'required|string|max:255',
            'pic_email' => 'required|email|max:255',
            'pic_phone' => ['required', 'regex:/^(\+62|62|0)[0-9\s\-]{8,14}$/', 'max:15'],
        ]);

        $project->update([
            'title' => $request->title,
            'pm_name' => $request->pm_name,
            'team_members' => $request->team_members,
            'pic_name' => $request->pic_name,
            'pic_email' => $request->pic_email,
            'pic_phone' => $request->pic_phone,
        ]);

        return redirect()->route('projects.index')->with('success', 'Pekerjaan berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();
        
        return redirect()->route('projects.index')->with('success', 'Pekerjaan berhasil dihapus.');
    }
}