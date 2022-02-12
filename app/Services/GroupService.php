<?php

namespace App\Services;

use App\Utilities\UploadFileUtility;
use Illuminate\Support\Carbon;
use App\Models\GroupQuestion;

/**
 * GroupService
 */
class GroupService
{
    protected $questionService;
    protected $uploadFileUtil;

    /**
     * __construct
     *
     * @param  mixed $questionService
     * @param  mixed $uploadFileUtil
     * @return void
     */
    public function __construct(UploadFileUtility $uploadFileUtil, QuestionService $questionService)
    {
        $this->questionService = $questionService;
        $this->uploadFileUtil = $uploadFileUtil;
    }
    /**
     * create group question
     *
     * @param  array $data
     * @return void
    */
    public function createGroupQuestion($groupQuestions, $testId, $type = 'create')
    {
        foreach ($groupQuestions as $groupQuestion) {
            $dataGroupQuestion = null;
            $dataGroupQuestion['description'] = $groupQuestion['description'];
            $dataGroupQuestion['test_id'] = $testId;
            if (isset($groupQuestion['part_id'])) $dataGroupQuestion['part_id'] = $groupQuestion['part_id'];
            if (isset($groupQuestion['image']) && preg_match('/^data:image\/(\w+);base64,/', $groupQuestion['image'])) {
                $dataGroupQuestion['image'] = $this->createImage($groupQuestion, $testId);
            }

            if (isset($groupQuestion['audio']) && preg_match('/^data:audio\/(\w+);base64,/', $groupQuestion['audio'])) {
                $dataGroupQuestion['audio'] = $this->createAudio($groupQuestion, $testId);
            }
            $this->createOrUpdate($dataGroupQuestion, $groupQuestion);
        }
    }
    /**
     * create image file
     *
     * @param  array $groupQuestion
     * @return void
    */
    public function createImage($groupQuestion, $testId)
    {
        $imagePath = 'tests/t'.$testId.'/image/g'.$groupQuestion['id'] . '_' . time() . '.png';
        $imagePathOld = $groupQuestion['image_old'] ?? '';
        $this->uploadFileUtil->uploadFileBase64($groupQuestion['image'], $imagePath, $imagePathOld);
        return $imagePath;
    }
    /**
     * create audio file
     *
     * @param  array $groupQuestion
     * @return void
    */
    public function createAudio($groupQuestion, $testId)
    {
        $audioPath = 'tests/t'.$testId.'/audio/g'.$groupQuestion['id'] . '_' . time() . '.mp3';
        $audioPathOld = $groupQuestion['audio_old'] ?? '';
        $this->uploadFileUtil->uploadFileBase64($groupQuestion['audio'], $audioPath, $audioPathOld);
        return $audioPath;
    }
    /**
     * create group question
     *
     * @param  array $data
     * @return void
    */
    public function createOrUpdate($dataGroupQuestion, $groupQuestion)
    {
        if (isset($groupQuestion['isNew']) && $groupQuestion['isNew']) {
            $newGroupQuestion = GroupQuestion::create($dataGroupQuestion);
            $this->questionService->createOrUpdate($groupQuestion['list_question'], $newGroupQuestion);
        }

        if (isset($groupQuestion['isEdit']) && $groupQuestion['isEdit']) {
            GroupQuestion::find($groupQuestion['id'])->update($dataGroupQuestion);
            $this->questionService->createOrUpdate($groupQuestion['list_question'], $groupQuestion);
        }
    }

    /**
     * delete array groups
     *
     * @param  array $ids
     * @return void
    */
    public function deleteGroups($ids)
    {
        $groups = GroupQuestion::whereIn('id', $ids)->get();
        foreach ($groups as $group) {
            $this->deleteFile($group['image']);
            $this->deleteFile($group['audio']);
            $group->delete();
        }
    }
    /**
     * delete file
     *
     * @param  string $filePath
     * @return void
    */
    public function deleteFile($filePath)
    {
        if (isset($filePath)) {
            $file = 'public/' . $filePath;
            $this->uploadFileUtil->deleteFile($file);
        }
    }
}
