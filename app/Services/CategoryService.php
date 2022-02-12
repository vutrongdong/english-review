<?php

namespace App\Services;

use App\Models\Category;

/**
 * CategoryService
 */
class CategoryService
{
    /**
     * get Categories
     *
     * @return void
     */
    public function getCategories()
    {
        $categories = $this->searchCategories();
        return $categories->DataTablePaginate();
    }

    /**
     * search categories
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function searchCategories()
    {
        $query = Category::query();
        
        if (request()->name) {
            $query->where('name', 'LIKE', request()->name);
        }

        if (request()->slug) {
            $query->where('slug', 'LIKE', request()->slug);
        }

        return $query;
    }

    /**
     * get category by id
     *
     * @param  int $id
     * @return void
     */
    public function info($id)
    {
        $category = Category::findOrFail($id);

        return $category;
    }

    /**
     * create category
     *
     * @param  array $data
     * @return void
     */
    public function createCategory($data)
    {
        $category = Category::create($data);
        return $category;
    }

    /**
     * create category
     *
     * @param  array $data
     * @return void
     */
    public function editCategory($data)
    {
        $category = Category::findOrFail($data['id'])->update($data);
        return $category;
    }

    /**
     * delete category
     *
     * @param  mixed $id
     * @return void
     */
    public function deleteCategory($id)
    {
        $category = Category::findOrFail($id);

        return $category->delete();
    }
}
