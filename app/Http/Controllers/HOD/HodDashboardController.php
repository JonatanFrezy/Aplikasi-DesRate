<?php

namespace App\Http\Controllers\HOD;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Response;
use App\Models\RatingResponse;
use Illuminate\Support\Facades\Response as FileResponse;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Illuminate\Support\Facades\Storage;

class HodDashboardController extends Controller
{
    public function index()
    {
        return view('hod.dashboard');
    }

    public function exportFeedback()
    {
        $feedbacks = Response::with('question.project', 'user')->get();

        $dataArray = $feedbacks->map(function ($response) {
            return [
                'Nama Proyek' => $response->question->project->project_name ?? '-',
                'Nama Pelanggan' => $response->user->name ?? '-',
                'Jawaban' => $response->answer ?? '-',
                'Tanggal' => $response->created_at->format('Y-m-d'),
            ];
        })->toArray();

        $filePath = 'exports/feedback.csv';
        SimpleExcelWriter::create(storage_path('app/' . $filePath))
            ->addRows($dataArray);

        return response()->download(storage_path('app/' . $filePath))->deleteFileAfterSend();
    }
}