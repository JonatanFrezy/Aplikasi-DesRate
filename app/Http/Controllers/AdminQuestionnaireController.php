<?php

namespace App\Http\Controllers;

use App\Models\Questionnaire;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AdminQuestionnaireController extends Controller
{
    public function index(): Response
    {
        $questionnaires = Questionnaire::withCount(['questions'])->get();

        return Inertia::render('admin/questionnaires/index', [
            'questionnaires' => $questionnaires,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/questionnaires/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:text,radio',
            'questions.*.order_number' => 'nullable|integer',
            'questions.*.is_required' => 'boolean',
            'questions.*.answer_options' => 'nullable|array',
            'questions.*.answer_options.*.value' => 'required|integer',
            'questions.*.answer_options.*.label' => 'required|string|max:255',
        ]);

        // Simpan kuesioner
        $questionnaire = Questionnaire::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        // Simpan pertanyaan
        foreach ($validated['questions'] as $questionData) {
            $question = $questionnaire->questions()->create([
                'text' => $questionData['text'],
                'type' => $questionData['type'],
                'order_number' => $questionData['order_number'] ?? null,
                'is_required' => $questionData['is_required'] ?? false,
            ]);

            // Simpan opsi jawaban jika tipe-nya radio
            if ($questionData['type'] === 'radio' && !empty($questionData['answer_options'])) {
                foreach ($questionData['answer_options'] as $option) {
                    $question->answerOptions()->create([
                        'value' => $option['value'],
                        'label' => $option['label'],
                    ]);
                }
            }
        }

        return redirect()->route('admin.questionnaires.index')->with('success', 'Kuesioner berhasil ditambahkan.');
    }


    public function edit($id): Response
    {
        $questionnaire = Questionnaire::with(['questions.answerOptions'])->findOrFail($id);

        return Inertia::render('admin/questionnaires/edit', [
            'questionnaire' => $questionnaire
        ]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $questionnaire = Questionnaire::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'questions' => 'required|array',
            'questions.*.text' => 'required|string',
            'questions.*.type' => 'required|in:text,radio',
            'questions.*.order_number' => 'nullable|integer',
            'questions.*.is_required' => 'boolean',
            'questions.*.answer_options' => 'nullable|array',
            'questions.*.answer_options.*.value' => 'required|integer',
            'questions.*.answer_options.*.label' => 'required|string|max:255',
        ]);

        // Update data kuesioner
        $questionnaire->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        // Hapus semua pertanyaan dan opsi lama
        $questionnaire->questions->each(function ($oldQuestion) {
            $oldQuestion->answerOptions()->delete();
        });
        $questionnaire->questions()->delete();


        // Simpan ulang pertanyaan dan opsi baru
        foreach ($validated['questions'] as $questionData) {
            $question = $questionnaire->questions()->create([
                'text' => $questionData['text'],
                'type' => $questionData['type'],
                'order_number' => $questionData['order_number'] ?? null,
                'is_required' => $questionData['is_required'] ?? false,
            ]);

            if ($questionData['type'] === 'radio' && !empty($questionData['answer_options'])) {
                foreach ($questionData['answer_options'] as $option) {
                    $question->answerOptions()->create([
                        'value' => $option['value'],
                        'label' => $option['label'],
                    ]);
                }
            }
        }

        return redirect()->route('admin.questionnaires.index')->with('success', 'Kuesioner berhasil diperbarui.');
    }

    public function destroy($id): RedirectResponse
    {
        $questionnaire = Questionnaire::findOrFail($id);
        $questionnaire->delete();

        return redirect()->route('admin.questionnaires.index')->with('success', 'Kuesioner berhasil dihapus.');
    }
}