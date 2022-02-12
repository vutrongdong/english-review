<?php

namespace Modules\Api\Http\Controllers;

use App\Services\CategoryService;
use Modules\Api\Http\Requests\CategoryRequest;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * CategoryController
 */
class CategoryController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $categoryService;

    /**
     * __construct
     *
     * @param  mixed $categoryService
     * @return void
     */
    public function __construct(CategoryService $categoryService)
    {
        parent::__construct();

        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $categories = $this->categoryService->getCategories();

        return $this->returnSuccess($categories);
    }

    /**
     * create Category
     *
     * @param  mixed $request
     * @return void
     */
    public function edit(CategoryRequest $request)
    {
        $data = $request->only('name', 'slug', 'id');
        
        return $this->categoryService->editCategory($data);
    }

    /**
     * edit Category
     *
     * @param  mixed $request
     * @return void
     */
    public function create(CategoryRequest $request)
    {
        $data = $request->only('name', 'slug');
        
        return $this->categoryService->createCategory($data);
    }

    /**
     * edit category
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function info($id)
    {
        $category = $this->categoryService->info($id);

        return $this->returnSuccess($category);
    }

    /**
     * delete category
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $result = $this->categoryService->deleteCategory($id);

        return $this->returnSuccess($result);
    }
}
