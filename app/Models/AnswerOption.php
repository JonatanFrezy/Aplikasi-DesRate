<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerOption extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function responseDetails()
    {
        return $this->hasMany(ResponseDetail::class);
    }
}
