<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Support\Facades\DB;
use App\Utilities\UploadFileUtility;

/**
 * BlogService
 */
class BlogService
{
    /**
     * __construct
     *
     * @param  mixed $uploadFile
     * @return void
     */
    public function __construct(UploadFileUtility $uploadFile)
    {
        $this->uploadFile = $uploadFile;
    }

    /**
     * get blogs
     *
     * @return void
     */
    public function getBlogs()
    {
        $blogs = $this->searchBlogs();
        return $blogs->DataTablePaginate();
    }

    /**
     * search blogs
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function searchBlogs()
    {
        $query = Blog::query()->with(['author:id,name', 'category:id,name']);
        $request = request();

        if ($request->random) $query->inRandomOrder();
        
        if ($request->title) {
            $query->where(function($query) use($request){
                $query->where('title', 'LIKE', "%{$request->title}%");
                $query->orWhere('slug', 'LIKE', "%{$request->title}%");
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
            $query->withCount(['tests']);
        }

        if (isset($request->active)) {
            $query->where('active', $request->active);
        }

        if ($request->author_id) {
            $query->where('author_id', $request->author_id);
        }

        return $query->exclude(['content']);
    }

    /**
     * get blog by id
     *
     * @param  int $id
     * @return void
     */
    public function info($id)
    {
        $blog = Blog::with('author:id,name')
                    ->findOrFail($id);

        return $blog;
    }

    /**
     * get blog by slug
     *
     * @param  string $slug
     * @return void
     */
    public function getBySlug($slug)
    {
        $blog = Blog::where('slug', $slug)->with('tests')->firstOrFail();
        $blog->update([
            'view'=> DB::raw('view + 1')
        ]);
        return $blog;
    }

    /**
     * create blog
     *
     * @param  array $data
     * @return void
     */
    public function createBlog($data)
    {
        if (isset($data['image'])) {
            $data['image'] = $this->uploadFile->uploadImage($data['image'], 'blogs/', 'public/blogs/');
        }
        $data['author_id'] = authUser()->id;
        $blog = Blog::create($data);
        return $blog;
    }

    /**
     * create blog
     *
     * @param  array $data
     * @return void
     */
    public function editBlog($data)
    {
        if (!isset($data['image_old'])) $data['image_old'] = '';
        if (isset($data['image'])) {
            $data['image'] = $this->uploadFile->uploadImage($data['image'], 'blogs/', $data['image_old']);
        }
        unset($data['image_old']);
        $blog = Blog::findOrFail($data['id'])->update($data);
        return $blog;
    }

    /**
     * upload image
     *
     * @param  array $image
     * @return void
     */
    public function upload($data)
    {
        $image = $this->uploadFile->uploadImage($data['image'], 'blogs/', '', false);

        return 'storage/' . $image;
    }

    /**
     * delete blog
     *
     * @param  mixed $id
     * @return void
     */
    public function deleteBlog($id)
    {
        $blog = Blog::findOrFail($id);

        return $blog->delete();
    }
}
