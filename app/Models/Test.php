<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\DataTablePaginate;

class Test extends Model
{
    use HasFactory;
    use DataTablePaginate;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'slug', 'date', 'subject', 'category_id', 'grammar_id', 'author_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function grammar()
    {
        return $this->belongsTo(Blog::class, 'grammar_id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function group_questions()
    {
        return $this->hasMany(GroupQuestion::class, 'test_id');
    }

    /**
     * delete
     * @return bool|void|null
     * @throws \Exception
     */
    public function delete()
    {
        $groups = $this->group_questions()->get();
        foreach ($groups as $group) {
            $group->delete();
        }
        parent::delete();
    }
}
