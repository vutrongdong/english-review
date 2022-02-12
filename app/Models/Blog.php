<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\DataTablePaginate;

class Blog extends Model
{
    use HasFactory;
    use DataTablePaginate;

    protected $fillable = [
        'id', 'title', 'slug', 'image', 'content', 'active', 'hot', 'category_id', 'author_id', 'view', 'description'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function tests()
    {
        return $this->hasMany(Test::class, 'grammar_id', 'id');
    }

    public function scopeExclude($query, $value = []) 
    {
        return $query->select(array_diff($this->fillable, (array) $value));
    }
}
