<?php

namespace App\Mail;

use App\Models\RatingLink;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRatingLink extends Mailable
{
    use Queueable, SerializesModels;

    public RatingLink $ratingLink;

    public function __construct(RatingLink $ratingLink)
    {
        $this->ratingLink = $ratingLink;
    }

    public function build()
    {
        return $this->subject("Link Kuesioner untuk {$this->ratingLink->send_to_name}")
                    ->view('emails.send-rating-link')
                    ->with([
                        'name' => $this->ratingLink->send_to_name,
                        'link' => route('rating.form', ['token' => $this->ratingLink->token]),
                    ]);
    }
}