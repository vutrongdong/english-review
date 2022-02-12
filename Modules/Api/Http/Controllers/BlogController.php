<?php

namespace Modules\Api\Http\Controllers;

use App\Services\BlogService;
use Illuminate\Http\Request;
use Modules\Api\Http\Requests\BlogRequest;
use Modules\Api\Http\Requests\UploadRequest;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

/**
 * BlogController
 */
class BlogController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $blogService;

    /**
     * __construct
     *
     * @param  mixed $blogService
     * @return void
     */
    public function __construct(BlogService $blogService)
    {
        parent::__construct();

        $this->blogService = $blogService;
    }

    /**
     * info blog
     *
     * @param  number \Http\JsonResponse
     */
    public function info($id)
    {
        $blog = $this->blogService->info($id);

        return $this->returnSuccess($blog);
    }
    /**
     * get by slug
     *
     * @param  string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBySlug($slug)
    {
        $blog = $this->blogService->getBySlug($slug);

        return $this->returnSuccess($blog);
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $blogs = $this->blogService->getBlogs();

        return $this->returnSuccess($blogs);
    }

    /**
     * edit blog
     *
     * @param  mixed $request
     * @return void
     */
    public function edit(BlogRequest $request)
    {
        $data = $request->only('id', 'title', 'slug', 'category_id', 'active', 'hot', 'image', 'image_old', 'description', 'content');
        
        return $this->blogService->editBlog($data);
    }

    /**
     * create blog
     *
     * @param  mixed $request
     * @return void
     */
    public function create(BlogRequest $request)
    {
        $data = $request->only('title', 'slug', 'category_id', 'active', 'hot', 'image', 'description', 'content');

        return $this->blogService->createBlog($data);
    }

    /**
     * upload image
     *
     * @param  mixed $request
     * @return void
     */
    public function upload(Request $request)
    {
        $image = $request->only('image');

        return $this->blogService->upload($image);
    }

    /**
     * delete blog
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $result = $this->blogService->deleteblog($id);

        return $this->returnSuccess($result);
    }
}
