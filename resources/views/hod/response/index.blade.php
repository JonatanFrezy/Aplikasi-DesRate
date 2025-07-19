@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Daftar Feedback Pelanggan</h1>

        @foreach ($projects as $project)
            <div class="card mb-3">
                <div class="card-header">
                    <strong>{{ $project->title }}</strong>
                </div>
                <div class="card-body">
                    @if ($project->responses->isEmpty())
                        <p>Tidak ada feedback untuk proyek ini.</p>
                    @else
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Rating</th>
                                    <th>Saran</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($project->responses as $response)
                                    <tr>
                                        <td>{{ $response->respondent_name }}</td>
                                        <td>{{ $response->respondent_email }}</td>
                                        <td>{{ $response->rating }}</td>
                                        <td>{{ $response->suggestion }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                        <a href="{{ route('hod.responses.download', $project->id) }}" class="btn btn-sm btn-success mt-2">
                            Download Excel
                        </a>
                    @endif
                </div>
            </div>
        @endforeach
    </div>
@endsection