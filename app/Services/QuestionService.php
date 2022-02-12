<?php

namespace App\Services;

use App\Utilities\UploadFileUtility;
use Illuminate\Support\Carbon;
use App\Models\Question;

/**
 * QuestionService
 */
class QuestionService
{
    protected $uploadFileUtil;
    /**
     * __construct
     *
     * @param  mixed $uploadFileUtil
     * @return void
     */
    public function __construct(UploadFileUtility $uploadFileUtil)
    {
        $this->uploadFileUtil = $uploadFileUtil;
    }
    /**
     * create array question
     *
     * @param  array $data
     * @return void
    */
    public function createOrUpdate($listQuestion, $group)
    {
        $dataQuestions = [];
        foreach ($listQuestion as $question) {
            $question['group_id'] = $group['id'];
            $question['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');
            // create image for question
            $question['image'] = '';
            if (isset($question['image']) && preg_match('/^data:image\/(\w+);base64,/', $question['image'])) {
                $question['image'] = $this->createImage($question, $group);
            }
            // create audio for question
            $question['audio'] = '';
            if (isset($question['audio']) && preg_match('/^data:audio\/(\w+);base64,/', $question['audio'])) {
                $question['audio'] = $this->createAudio($question, $group);
            }

            if (isset($question['isNew']) && $question['isNew']) {
                unset($question['id'], $question['isNew']);
                $question['created_at'] = Carbon::now()->format('Y-m-d H:i:s');
                $dataQuestions[] = $question;
            }

            if (isset($question['isEdit']) && $question['isEdit']) {
                unset($question['isEdit']);
                Question::find($question['id'])->update($question);
            }
        }

        Question::insert($dataQuestions);
    }
    /**
     * delete array question
     *
     * @param  array $ids
     * @return void
    */
    public function deleteQuestions($ids)
    {
        $questions = Question::whereIn('id', $ids)->get();
        foreach ($questions as $question) {
            $this->deleteFile($question['image']);
            $this->deleteFile($question['audio']);
            $question->delete();
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
    /**
     * create image file
     *
     * @param  array $question
     * @return void
    */
    public function createImage($question, $group)
    {
        $imagePath = 'tests/t'.$group['test_id'].'/image/g'.$group['id'].'q'.$question['id'] . '_' . time() . '.png';
        $imagePathOld = $question['image_old'] ?? '';
        $this->uploadFileUtil->uploadFileBase64($question['image'], $imagePath, $imagePathOld);
        return $imagePath;
    }
    /**
     * create audio file
     *
     * @param  array $question
     * @return void
    */
    public function createAudio($question, $group)
    {
        $audioPath = 'tests/t'.$group['test_id'].'/audio/g'.$group['id'].'q'.$question['id'] . '_' . time() . '.mp3';
        $audioPathOld = $question['audio_old'] ?? '';
        $this->uploadFileUtil->uploadFileBase64($question['audio'], $audioPath, $audioPathOld);
        return $audioPath;
    }
}