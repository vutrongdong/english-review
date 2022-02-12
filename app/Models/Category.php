<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\DataTablePaginate;

class Category extends Model
{
    use HasFactory;
    use DataTablePaginate;

    protected $fillable = [
        'name', 'slug'
    ];
}
