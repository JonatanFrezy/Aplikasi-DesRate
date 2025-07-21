<?php

namespace App\Http\Controllers;

use App\Models\Response as FormResponse;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $responses = FormResponse::with(['responseDetails.answerOption', 'ratingLink'])->get();

        $totalResponses = $responses->count();
        $totalProjects = Project::count();

        // Ambil semua nilai rating valid (numerik)
        $allRatingValues = $responses->flatMap(function ($response) {
            return $response->responseDetails
                ->filter(fn($detail) => is_numeric($detail->answerOption?->value))
                ->pluck('answerOption.value');
        });

        $averageRating = $allRatingValues->avg();

        // Distribusi rating 1–5, dibulatkan ke nilai terdekat
        $roundedRatings = $allRatingValues->map(fn($value) => round($value));
        $ratingCounts = $roundedRatings->countBy();

        // Susun dalam array numerik untuk BarChart
        $ratingDistribution = [];
        for ($i = 5; $i >= 1; $i--) {
            $ratingDistribution[] = [
                'rating' => $i,
                'count' => $ratingCounts[$i] ?? 0,
            ];
        }

        // Top 5 pengisi rating berdasarkan rata-rata nilai mereka
        $groupedByName = $responses->groupBy(fn($response) => $response->ratingLink?->send_to_name ?? 'Tidak diketahui');

        $topRatings = $groupedByName->map(function ($group, $name) {
            $ratings = $group->flatMap(function ($response) {
                return $response->responseDetails
                    ->filter(fn($detail) => is_numeric($detail->answerOption?->value))
                    ->pluck('answerOption.value');
            });

            return [
                'name' => $name,
                'avg_rating' => round($ratings->avg(), 2),
                'count' => $ratings->count(),
            ];
        })
        ->filter(fn($item) => $item['count'] > 0)
        ->sortByDesc('avg_rating')
        ->take(5)
        ->values();

        // Tanggal response terakhir
        $latestResponseDate = optional(
            $responses->sortByDesc('submitted_at')->first()
        )->submitted_at;

        return Inertia::render('dashboard', [
            'total_projects' => $totalProjects,
            'total_responses' => $totalResponses,
            'average_rating' => round($averageRating, 2),
            'ratingDistribution' => $ratingDistribution,
            'topRatings' => $topRatings,
            'latestResponseDate' => $latestResponseDate
                ? Carbon::parse($latestResponseDate)->format('d/m/Y')
                : null,
        ]);
    }
}
