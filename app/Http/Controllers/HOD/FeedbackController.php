<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Response;
use App\Models\ResponseDetail;
use App\Models\Question;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\FeedbackExport;

class FeedbackController extends Controller
{
    public function showForm($projectId)
    {
        return view('feedback.form', compact('projectId'));
    }

    public function submit(Request $request, $projectId)
    {
        // Validasi data jika diperlukan

        $response = Response::create([
            'project_id' => $projectId,
            'user_id' => auth()->id(), // jika pakai auth
        ]);

        foreach ($request->input('answers') as $questionId => $answer) {
            ResponseDetail::create([
                'response_id' => $response->id,
                'question_id' => $questionId,
                'answer' => $answer,
            ]);
        }

        return redirect()->route('feedback.form', $projectId)->with('success', 'Feedback berhasil dikirim.');
    }

    public function index()
    {
        $responses = Response::with('project')->latest()->get();
        return view('feedback.index', compact('responses'));
    }

    public function detail($responseId)
    {
        $response = Response::with(['project', 'details.question'])->findOrFail($responseId);
        return view('feedback.detail', compact('response'));
    }

    public function exportExcel()
    {
        return Excel::download(new FeedbackExport, 'feedback.xlsx');
    }
}