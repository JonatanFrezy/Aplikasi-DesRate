<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function answerOptions()
    {
        return $this->hasMany(AnswerOption::class);
    }

    public function responseDetails()
    {
        return $this->hasMany(ResponseDetail::class);
    }
}
