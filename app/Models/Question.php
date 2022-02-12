<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'audio', 'image', 'group_id', 'answer_a', 'answer_b', 'answer_c', 'answer_d', 'result', 'explain'
    ];
}
