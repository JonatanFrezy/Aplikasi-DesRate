<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $guarded = ['id', 'user_id'];
    
    public function questionnaire()
    {
        return $this->belongsTo(Questionnaire::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratingLinks()
    {
        return $this->hasMany(RatingLink::class);
    }
}
