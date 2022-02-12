<?php

namespace App\Services;

use App\Models\Test;

/**
 * TestService
 */
class TestService
{
    protected $groupService;
    protected $questionService;

    /**
     * __construct
     *
     * @param  mixed $groupService
     * @param  mixed $questionService
     * @return void
     */
    public function __construct(GroupService $groupService, QuestionService $questionService)
    {
        $this->groupService = $groupService;
        $this->questionService = $questionService;
    }

    /**
     * getTests
     *
     * @return void
     */
    public function getTests()
    {
        $tests = $this->searchTests();
        $result = $tests->DataTablePaginate()->toArray();

        $result['data'] = collect($result['data'])->map(function ($item) {
            $item['totalQuestion'] = array_sum(array_column($item['group_questions'], 'list_question_count'));
            unset($item['group_questions']);
            return $item;
        });

        return $result;
    }

    /**
     * search tests
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function searchTests()
    {
        $query = Test::query()->with(['category:id,name', 'author:id,name', 'grammar:id,title']);
        $query->with(['group_questions' => function ($q) {
            $q->withCount('list_question');
        }]);

        if (request()->keyword) {
            $keyword = request()->keyword;
            $query->where(function($query) use($keyword){
                $query->where('title', 'LIKE', "%{$keyword}%");
                $query->orWhere('slug', 'LIKE', "%{$keyword}%");
            });
        }

        if (request()->category_id) {
            $query->where('category_id', request()->category_id);
        }

        if (request()->author_id) {
            $query->where('author_id', request()->author_id);
        }

        return $query;
    }

    /**
     * get test by id
     *
     * @param  int $id
     * @return void
     */
    public function show($id)
    {
        return Test::with('group_questions.list_question')->findOrFail($id);
    }
    
    /**
     * get test by slug
     *
     * @param  string $slug
     * @return void
     */
    public function getBySlug($slug)
    {
        $selects = ['id', 'title', 'audio', 'image', 'group_id', 'answer_a', 'answer_b', 'answer_c', 'answer_d'];
        if (request()->getResult) $selects = ['id', 'group_id', 'result', 'explain'];
        return Test::with(['group_questions.list_question'=> function($query) use ($selects) {
            $query->select($selects);
        }])->where('slug', '=', $slug)->firstOrFail();
    }

    /**
     * create test
     *
     * @param  array $data
     * @return void
     */
    public function createTest($data)
    {
        $dataTest = collect($data)->only('title', 'slug', 'subject', 'date', 'grammar_id', 'category_id')->toArray();
        $dataTest['author_id'] = authUser()->id;
        $testNew = Test::create($dataTest);
        $this->groupService->createGroupQuestion($data['group_questions'], $testNew['id']);
    }

    /**
     * create test
     *
     * @param  array $data
     * @return void
     */
    public function editTest($data)
    {
        $dataTest = collect($data)->only('title', 'slug', 'subject', 'date', 'grammar_id', 'category_id')->toArray();
        $this->groupService->createGroupQuestion($data['group_questions'], $data['id'], 'edit');

        if (isset($data['question_delete_arr'])) {
            $this->questionService->deleteQuestions($data['question_delete_arr']);
        }

        if (isset($data['group_delete_arr'])) {
            $this->groupService->deleteGroups($data['group_delete_arr']);
        }

        return Test::findOrFail($data['id'])->update($dataTest);
    }

    /**
     * delete test
     *
     * @param  mixed $id
     * @return void
     */
    public function deleteTest($id)
    {
        $test = Test::findOrFail($id);

        return $test->delete();
    }
}
