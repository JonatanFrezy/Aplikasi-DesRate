{{-- resources/views/hod/dashboard.blade.php --}}

@extends('layouts.app') {{-- atau layout yang kamu gunakan --}}

@section('content')
    <div class="container">
        <h1>Dashboard HOD</h1>

        <h2>Daftar Proyek</h2>
        <ul>
            @foreach($projects as $project)
                <li>{{ $project->title }}</li>
            @endforeach
        </ul>
    </div>
@endsection