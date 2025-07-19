<?php

namespace App\Http\Controllers;

use App\Models\RatingLink;
use Inertia\Inertia;

class RatingFormController extends Controller
{
    public function show($token)
    {
        $ratingLink = RatingLink::with(['project', 'questionnaire.questions.answerOptions'])->where('token', $token)->firstOrFail();

        if ($ratingLink->is_used) {
            abort(403, 'Link ini sudah digunakan.');
        }

        return Inertia::render('customer/form/show', [
            'rating_link' => $ratingLink
        ]);
    }
}
