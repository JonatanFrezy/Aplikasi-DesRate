<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    public $timestamps = false;

    public function ratingLink()
    {
        return $this->belongsTo(RatingLink::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function responseDetails()
    {
        return $this->hasMany(ResponseDetail::class);
    }
}
