<?php

namespace App\Http\Controllers;

use App\Mail\SendRatingLink;
use App\Models\RatingLink;
use App\Models\Project;
use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class AdminRatingLinkController extends Controller
{
    public function index(): Response
    {
        $ratingLinks = RatingLink::with(['project', 'questionnaire'])->latest()->get()
            ->map(function ($ratingLink) {
                $ratingLink->link = route('rating.form', ['token' => $ratingLink->token]);
                return $ratingLink;
            });

        return Inertia::render('admin/rating-links/index', [
            'rating_links' => $ratingLinks
        ]);
    }

    public function create(): Response
    {
        $projects = Project::all();
        $questionnaires = Questionnaire::all();

        return Inertia::render('admin/rating-links/create', [
            'projects' => $projects,
            'questionnaires' => $questionnaires
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'send_to_name' => 'required|string|max:255',
            'send_to_email' => 'nullable|email|max:255',
            'send_to_phone' => ['nullable', 'regex:/^(\+62|62|0)[0-9\s\-]{8,14}$/', 'max:15'],
            'project_id' => 'required|exists:projects,id',
            'questionnaire_id' => 'required|exists:questionnaires,id',
        ]);

        $ratingLink = RatingLink::create([
            'token' => Str::uuid(),
            'send_to_name' => $request->send_to_name,
            'send_to_email' => $request->send_to_email,
            'send_to_phone' => $request->send_to_phone,
            'project_id' => $request->project_id,
            'questionnaire_id' => $request->questionnaire_id,
        ]);

        if ($ratingLink->send_to_email) {
            Mail::to($ratingLink->send_to_email)->send(new SendRatingLink($ratingLink));
        }

        return redirect()->route('admin.rating-links.index')->with('success', 'Link Rating berhasil ditambahkan.');
    }

    public function edit($id): Response
    {
        $ratingLink = RatingLink::with(['project', 'questionnaire'])->findOrFail($id);
        $projects = Project::all();
        $questionnaires = Questionnaire::all();

        return Inertia::render('admin/rating-links/edit', [
            'rating_link' => $ratingLink,
            'projects' => $projects,
            'questionnaires' => $questionnaires
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $ratingLink = RatingLink::findOrFail($id);

        if ($ratingLink->is_used) {
            return redirect()->route('admin.rating-links.index')->withErrors(['error' => 'Link sudah digunakan dan tidak bisa diubah.']);
        }

        $request->validate([
            'send_to_name' => 'required|string|max:255',
            'send_to_email' => 'nullable|email|max:255',
            'send_to_phone' => ['nullable', 'regex:/^(\+62|62|0)[0-9\s\-]{8,14}$/', 'max:15'],
            'project_id' => 'required|exists:projects,id',
            'questionnaire_id' => 'required|exists:questionnaires,id',
        ]);

        $oldEmail = $ratingLink->send_to_email;

        $ratingLink->update([
            'send_to_name' => $request->send_to_name,
            'send_to_email' => $request->send_to_email,
            'send_to_phone' => $request->send_to_phone,
            'project_id' => $request->project_id,
            'questionnaire_id' => $request->questionnaire_id,
        ]);

        if ($request->send_to_email && $oldEmail !== $request->send_to_email) {
            Mail::to($request->send_to_email)->send(new SendRatingLink($ratingLink));
        }


        return redirect()->route('admin.rating-links.index')->with('success', 'Link Rating berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        $ratingLink = RatingLink::findOrFail($id);
        $ratingLink->delete();
        
        return redirect()->route('admin.rating-links.index')->with('success', 'Link Rating berhasil dihapus.');
    }

    public function resend($id): RedirectResponse
    {
        $ratingLink = RatingLink::findOrFail($id);

        if (!$ratingLink->send_to_email) {
            return redirect()->back()->withErrors(['error' => 'Email tidak tersedia untuk link ini.']);
        }

        Mail::to($ratingLink->send_to_email)->send(new SendRatingLink($ratingLink));

        return redirect()->route('admin.rating-links.index')->with('success', 'Email berhasil dikirim ulang.');
    }
}