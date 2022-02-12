<?php

namespace App\Traits;

use Illuminate\Support\Collection;

trait DataTablePaginate
{

    /**
     * scope Data Table Paginate
     *
     * @param  mixed $query
     * @return Collection
     */
    public function scopeDataTablePaginate($query)
    {

        $request = request();
        $direction = 'desc';
        $per_page = config('app.perpage');
        if ($request->per_page !== null) $per_page = (int)$request->per_page;
        if(!$request->disable_sort) {
            $sort_column = 'id';
            if ($request->sort_column !== null) $sort_column = $request->sort_column;
            if ($request->direction !== null) $direction = $request->direction;
            $query = $query->orderBy($sort_column, $direction);
        }
        $query = $per_page != -1 ? $query->paginate($per_page) : $query->get();

        return $query;
    }

}
