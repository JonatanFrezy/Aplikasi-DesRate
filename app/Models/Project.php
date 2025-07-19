<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['user_id', 'title', 'description']; // sesuaikan field-nya

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratingLinks()
    {
        return $this->hasMany(RatingLink::class);
    }
}