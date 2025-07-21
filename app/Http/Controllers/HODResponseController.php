<?php

namespace App\Http\Controllers;

use App\Models\Response as FormResponse;
use Inertia\Inertia;
use Inertia\Response;

class HODResponseController extends Controller
{
    public function index(): Response
    {
        $responses = FormResponse::with(['project', 'questionnaire', 'ratingLink', 'responseDetails.answerOption'])->orderBy('submitted_at', 'desc')->get();

        // Tambahkan nilai rata-rata ke tiap response
        $responses = $responses->map(function ($response) {
            $average = $response->responseDetails
                ->filter(fn ($responseDetail) => $responseDetail->answerOption?->value !== null)
                ->pluck('answerOption.value')
                ->avg();

            // Tambahkan sebagai properti baru
            $response->average_rating = $average
                ? round($average, 2)
                : null;

            return $response;
        });

        return Inertia::render('hod/responses/index', [
            'responses' => $responses
        ]);
    }

    public function show($id): Response
    {
        $response = FormResponse::with([
            'project',
            'questionnaire',
            'ratingLink',
            'responseDetails.question',
            'responseDetails.answerOption',
            'responseDetails.question.answerOptions',
        ])->findOrFail($id);

        // Hitung nilai rata-rata dari opsi nilai
        $average = $response->responseDetails
            ->filter(fn ($detail) => $detail->answerOption?->value !== null)
            ->pluck('answerOption.value')
            ->avg();

        $response->average_rating = $average ? round($average, 2) : null;

        return Inertia::render('hod/responses/show', [
            'response' => $response,
        ]);
    }
}