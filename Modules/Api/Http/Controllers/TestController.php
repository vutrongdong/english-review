<?php

namespace Modules\Api\Http\Controllers;

use App\Services\TestService;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Modules\Api\Http\Requests\TestRequest;
use Illuminate\Http\Request;

/**
 * TestController
 */
class TestController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $testService;

    /**
     * __construct
     *
     * @param  mixed $testService
     * @return void
     */
    public function __construct(TestService $testService)
    {
        parent::__construct();

        $this->testService = $testService;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tests = $this->testService->getTests();

        return $this->returnSuccess($tests);
    }

    /**
     * create test
     *
     * @param  mixed $request
     * @return void
     */
    public function create(TestRequest $request)
    {
        $data = $request->only('category_id', 'grammar_id', 'subject', 'date', 'title', 'slug', 'group_questions');
        
        return $this->testService->createTest($data);
    }

    /**
     * edit test
     *
     * @param  mixed $request
     * @return void
     */
    public function edit(TestRequest $request)
    {
        $data = $request->only('id', 'category_id', 'grammar_id', 'subject', 'date',
        'title', 'slug', 'group_questions', 'group_delete_arr', 'question_delete_arr');
        
        return $this->testService->editTest($data);
    }

    /**
     * show test
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $test = $this->testService->show($id);

        return $this->returnSuccess($test);
    }

    /**
     * get test by slug
     *
     * @param  string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getBySlug($slug)
    {
        $test = $this->testService->getBySlug($slug);

        return $this->returnSuccess($test);
    }

    /**
     * delete test
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $result = $this->testService->deleteTest($id);

        return $this->returnSuccess($result);
    }
}
