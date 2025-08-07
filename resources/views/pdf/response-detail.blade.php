<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Detail Jawaban</title>
  <style>

    .container {
      max-width: 900px;
      margin: auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    }

    .header {
      text-align: center;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e5e7eb;
    }

    .header img {
      height: 56px;
      margin: 0 16px;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
      text-align: center;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 6px;
    }

    p {
      margin: 6px 0;
      font-size: 14px;
    }

    .label {
      font-weight: 500;
      color: #374151;
    }

    .card {
      border-radius: 12px;
      padding: 0px 15px 15px 15px;
      margin-bottom: 20px;
      border: 1px solid #e5e7eb;
    }

    .question-box {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      padding: 15px;
      margin-bottom: 10px;
    }

    .question-title {
      font-weight: 500;
      margin-bottom: 12px;
    }

    .selected-option {
      font-weight: 600;
      font-size: 14px;
      color: #2563eb;
    }

    .radio-option {
      display: flex;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      margin-bottom: 8px;
      background-color: #f9fafb;
    }

    .radio-option.selected {
      background-color: #eef2ff;
      border-color: #2563eb;
    }

    .text-danger {
      color: #dc2626;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="{{ public_path('logo-desrate.png') }}" alt="Logo DesRate" />
      <img src="{{ public_path('logo_desnet.png') }}" alt="Logo Desnet" />
      <p style="font-size: 13px; color: #6b7280; margin-top: 8px;">oleh PT DES Teknologi Informasi</p>
    </div>

    <h1>Detail Jawaban</h1>

    {{-- Informasi Reviewer --}}
    <div class="card">
      <h2>Informasi Reviewer</h2>
      <p><span class="label">Nama Pengisi:</span> {{ $response->ratingLink->send_to_name ?? '-' }}</p>
      <p><span class="label">Email:</span> {{ $response->ratingLink->send_to_email ?? '-' }}</p>
      <p><span class="label">Kontak:</span> {{ $response->ratingLink->send_to_phone ?? '-' }}</p>
      <p><span class="label">Tanggal Submit:</span> {{ \Carbon\Carbon::parse($response->submitted_at)->format('d M Y, H:i') }}</p>
      <p><span class="label">Rata-rata Nilai:</span> {{ $response->average_rating ?? '-' }}</p>
    </div>

    {{-- Informasi Pekerjaan --}}
    <div class="card">
      <h2>Informasi Pekerjaan</h2>
      <p><span class="label">Judul:</span> {{ $response->project->title ?? '-' }}</p>
      <p><span class="label">PM:</span> {{ $response->project->pm_name ?? '-' }}</p>
      <p><span class="label">Anggota Tim:</span> {{ $response->project->team_members ?? '-' }}</p>
    </div>

    {{-- Informasi Kuesioner --}}
    <div class="card">
      <h2>Kuesioner</h2>
      <p><span class="label">Judul:</span> {{ $response->questionnaire->title ?? '-' }}</p>
      <p><span class="label">Deskripsi:</span> {{ $response->questionnaire->description ?? '-' }}</p>

      {{-- Pertanyaan --}}
      <p class="label" style="margin-top: 20px;">Pertanyaan:</p>
      @foreach ($response->responseDetails->sortBy(fn($d) => $d->question->order_number ?? 0) as $index => $detail)
        <div class="question-box">
          @if ($detail->question)
            <p class="question-title">
              {{ $index + 1 }}. {{ $detail->question->text }}
              @if ($detail->question->is_required)
                <span class="text-danger">*</span>
              @endif
            </p>

            @if ($detail->answerOption)
              @foreach ($detail->question->answerOptions ?? [] as $opt)
                <div class="radio-option {{ $opt->id === $detail->selected_option_id ? 'selected' : '' }}">
                  <span>{{ $opt->label }}</span>
                  <span>
                    @if ($opt->id === $detail->selected_option_id)
                      &#x2714;
                    @endif
                  </span>
                </div>
              @endforeach
            @else
              <p>{{ $detail->answer_text ?? '-' }}</p>
            @endif
          @else
            <p class="text-danger">Pertanyaan tidak tersedia</p>
          @endif
        </div>
      @endforeach
    </div>
  </div>
</body>
</html>
