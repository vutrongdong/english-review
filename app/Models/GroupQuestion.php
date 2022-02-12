<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupQuestion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'test_id', 'part_id', 'description', 'audio', 'image'
    ];

    public function list_question()
    {
        return $this->hasMany(Question::class, 'group_id');
    }

    public static function boot() {
        parent::boot();

        // before delete() method call this
        static::deleting(function($group) {
            $group->list_question()->delete();
        });
    }
}
