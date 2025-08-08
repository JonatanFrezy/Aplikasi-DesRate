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
        $responses = FormResponse::with(['project', 'questionnaire', 'ratingLink', 'responseDetails.answerOption'])->get();

        $oneYearAgo = Carbon::now()->subYear();
        $totalResponses = $responses
            ->filter(fn($response) => Carbon::parse($response->submitted_at)->gte($oneYearAgo))
            ->count();
        $totalProjects = Project::where('created_at', '>=', $oneYearAgo)->count();

        $startOfThisMonth = Carbon::now()->startOfMonth();
        $endOfThisMonth = Carbon::now()->endOfMonth();

        $thisMonthResponses = $responses->filter(function ($response) use ($startOfThisMonth, $endOfThisMonth) {
            $date = Carbon::parse($response->submitted_at);
            return $date->between($startOfThisMonth, $endOfThisMonth);
        });

        $avgRatingsThisMonth = $thisMonthResponses->map(function ($response) {
            $numericRatings = $response->responseDetails
                ->filter(fn($detail) => is_numeric($detail->answerOption?->value))
                ->pluck('answerOption.value');

            return $numericRatings->isNotEmpty() ? $numericRatings->avg() : null;
        })->filter();

        $currentAverage = $avgRatingsThisMonth->avg();

        $startOfLastMonth = Carbon::now()->subMonth()->startOfMonth();
        $endOfLastMonth = Carbon::now()->subMonth()->endOfMonth();

        $lastMonthResponses = $responses->filter(function ($response) use ($startOfLastMonth, $endOfLastMonth) {
            $date = Carbon::parse($response->submitted_at);
            return $date->between($startOfLastMonth, $endOfLastMonth);
        });

        $avgRatingsLastMonth = $lastMonthResponses->map(function ($response) {
            $numericRatings = $response->responseDetails
                ->filter(fn($detail) => is_numeric($detail->answerOption?->value))
                ->pluck('answerOption.value');

            return $numericRatings->isNotEmpty() ? $numericRatings->avg() : null;
        })->filter();

        $previousAverage = $avgRatingsLastMonth->avg();

        // Ambil rata-rata rating per response (bukan tiap pertanyaan)
        $avgRatingsPerResponse = $responses->map(function ($response) {
            $numericRatings = $response->responseDetails
                ->filter(fn($detail) => is_numeric($detail->answerOption?->value))
                ->pluck('answerOption.value');

            return $numericRatings->isNotEmpty()
                ? $numericRatings->avg()
                : null;
        })->filter(); // buang null

        // Hitung rata-rata keseluruhan dari rata-rata tiap response
        $averageRating = $avgRatingsPerResponse->avg();

        // Distribusi rating berdasarkan rata-rata tiap response
        $roundedRatings = $avgRatingsPerResponse->map(fn($value) => round($value));
        $ratingCounts = $roundedRatings->countBy();

        // Susun dalam array numerik untuk BarChart (dari 5 ke 1)
        $ratingDistribution = [];
        for ($i = 5; $i >= 1; $i--) {
            $ratingDistribution[] = [
                'rating' => $i,
                'count' => $ratingCounts[$i] ?? 0,
            ];
        }

        $questionnaireData = $responses
            ->groupBy(fn($r) => $r->questionnaire->id ?? null)
            ->map(function ($group, $questionnaireId) {
                $questionnaire = $group->first()->questionnaire;
                $title = $questionnaire?->title ?? 'Judul Tidak Diketahui';

                $avgPerResponse = $group->map(fn($response) => $response->responseDetails
                    ->filter(fn($d) => is_numeric($d->answerOption?->value))
                    ->pluck('answerOption.value')
                    ->avg())
                    ->filter(fn($val) => !is_null($val));

                return [
                    'id' => (int) $questionnaireId,
                    'title' => $title,
                    'top' => round($avgPerResponse->max(), 2),
                    'least' => round($avgPerResponse->min(), 2),
                    'average' => round($avgPerResponse->avg(), 2),
                ];
            })
            ->filter(fn($q) => $q['top'] !== null && $q['least'] !== null && $q['average'] !== null)
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
            'questionnaireData' => $questionnaireData,
            'latestResponseDate' => $latestResponseDate
                ? Carbon::parse($latestResponseDate)->format('d/m/Y')
                : null,
            'averageTrend' => [
                'current' => $currentAverage ? round($currentAverage, 2) : null,
                'previous' => $previousAverage ? round($previousAverage, 2) : null,
            ],
        ]);
    }
}
