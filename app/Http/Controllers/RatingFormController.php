<?php

namespace App\Http\Controllers;

use App\Models\RatingLink;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class RatingFormController extends Controller
{
    public function show($token)
    {
        $ratingLink = RatingLink::with(['project', 'questionnaire.questions.answerOptions'])->where('token', $token)->firstOrFail();

        if ($ratingLink->is_used) {
            abort(403, 'Link ini sudah digunakan.');
        }

        return Inertia::render('customer/form/show', [
            'rating_link' => $ratingLink
        ]);
    }

    public function store(Request $request, string $token): RedirectResponse
    {
        $ratingLink = RatingLink::where('token', $token)->firstOrFail();

        $validated = $request->validate([
            'response_details' => 'required|array',
            'response_details.*.question_id' => 'required|exists:questions,id',
            'response_details.*.answer_text' => 'nullable|string',
            'response_details.*.selected_option_id' => 'nullable|exists:answer_options,id',
        ]);

        // Simpan respon utama
        $response = $ratingLink->response()->create([
            'rating_link_id' => $ratingLink->id,
            'project_id' => $ratingLink->project_id,
            'questionnaire_id' => $ratingLink->questionnaire_id,
            'submitted_at' => now(),
        ]);

        // Simpan setiap jawaban detail
        foreach ($validated['response_details'] as $detail) {
            $response->responseDetails()->create([
                'question_id' => $detail['question_id'],
                'answer_text' => $detail['answer_text'],
                'selected_option_id' => $detail['selected_option_id'],
            ]);
        }

        // Tandai link sudah digunakan
        $ratingLink->update(['is_used' => true]);

        return redirect()->route('rating.success', ['token' => $token])->with('success', 'Terima kasih atas partisipasi Anda.');
    }
}
