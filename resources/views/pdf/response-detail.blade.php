<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Jawaban #{{ $response->id }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            line-height: 1.6;
        }
        h1, h2 {
            margin-bottom: 10px;
        }
        .card {
            border: 1px solid #ccc;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 6px;
        }
        .label {
            font-weight: bold;
        }
        .question-box {
            border: 1px solid #ccc;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 10px;
        }
        .selected-option {
            font-weight: bold;
            color: #2563eb;
        }
        .dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 6px;
            vertical-align: middle;
        }
        .dot-filled {
            background-color: #2563eb;
        }
        .dot-empty {
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <h1>Detail Jawaban #{{ $response->id }}</h1>

    <div class="card">
        <h2>Informasi Reviewer</h2>
        <p><span class="label">Nama Pengisi:</span> {{ $response->ratingLink->send_to_name ?? '-' }}</p>
        <p><span class="label">Email:</span> {{ $response->ratingLink->send_to_email ?? '-' }}</p>
        <p><span class="label">Kontak:</span> {{ $response->ratingLink->send_to_phone ?? '-' }}</p>
        <p><span class="label">Tanggal Submit:</span> {{ \Carbon\Carbon::parse($response->submitted_at)->format('d M Y, H:i') }}</p>
        <p><span class="label">Rata-rata Nilai:</span> {{ $response->average_rating ?? '-' }}</p>
    </div>

    <div class="card">
        <h2>Informasi Pekerjaan</h2>
        <p><span class="label">Pekerjaan:</span> {{ $response->project->title ?? '-' }}</p>
        <p><span class="label">PM:</span> {{ $response->project->pm_name ?? '-' }}</p>
        <p><span class="label">Anggota Tim:</span> {{ $response->project->team_members ?? '-' }}</p>
    </div>

    <div class="card">
        <h2>Informasi Kuesioner</h2>
        <p><span class="label">Kuesioner:</span> {{ $response->questionnaire->title ?? '-' }}</p>
        <p><span class="label">Deskripsi:</span> {{ $response->questionnaire->description ?? '-' }}</p>

        <p><span class="label">Pertanyaan:</span></p>
        @foreach ($response->responseDetails->sortBy(fn($d) => $d->question->order_number ?? 0) as $index => $detail)
            <div class="question-box">
                @if ($detail->question)
                    <p class="label">{{ $index + 1 }}. {{ $detail->question->text }} 
                        @if ($detail->question->is_required)
                            <span style="color: red">*</span>
                        @endif
                    </p>

                    @if ($detail->answerOption)
                        @foreach ($detail->question->answerOptions ?? [] as $opt)
                            <p class="{{ $opt->id === $detail->selected_option_id ? 'selected-option' : '' }}">
                                <span class="dot {{ $opt->id === $detail->selected_option_id ? 'dot-filled' : 'dot-empty' }}"></span>
                                {{ $opt->label }}
                            </p>
                        @endforeach
                    @else
                        <p>{{ $detail->answer_text ?? '-' }}</p>
                    @endif
                @else
                    <p style="color: red">Pertanyaan tidak tersedia</p>
                @endif
            </div>
        @endforeach
    </div>
</body>
</html>
