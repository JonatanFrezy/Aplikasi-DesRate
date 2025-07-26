<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Pengisian Kuesioner</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <p>Yth. {{ $name }},</p>

    <p>Dengan hormat,</p>

    <p>Sehubungan dengan evaluasi layanan yang sedang kami lakukan, kami mohon kesediaan Anda untuk mengisi kuesioner berikut ini sebagai bagian dari proses perbaikan dan peningkatan kualitas layanan kami di <strong>{{ config('app.name') }}</strong>.</p>

    <p>Silakan akses tautan berikut untuk mengisi kuesioner:</p>

    <p>
        <a href="{{ $link }}" style="color: #1a73e8;">{{ $link }}</a>
    </p>

    <p>Partisipasi Anda sangat berarti bagi kami. Atas perhatian dan waktunya, kami ucapkan terima kasih.</p>

    <br>

    <p>Hormat kami,</p>
    <p><strong>Tim {{ config('app.name') }}</strong></p>
</body>
</html>
