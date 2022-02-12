<?php
namespace App\Utilities;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UploadFileUtility {
    public function uploadImage($image, $path, $pathOld, $isResize = true) 
    {
        if ($image == 'null') return;
        $image_name = time() . '.' . $image->getClientOriginalExtension();
        // delete image old
        $pathOldPublic = 'public/' . $pathOld;
        $this->deleteFile($pathOldPublic);
        // add new image
        $imageMake = Image::make($image->getRealPath());
        $imageMake->stream();

        Storage::disk('local')->put('public/' . $path . $image_name, $imageMake);

        return $path . $image_name;
    }

    public function uploadFileBase64($base64, $path, $pathOld = null) 
    {
        $pathPublic = 'public/' . $path;
        $pathOldPublic = $pathOld ? 'public/' . $pathOld : null;
        $checkBase64Image = preg_match('/^data:image\/(\w+);base64,/', $base64);
        $checkBase64Audio = preg_match('/^data:audio\/(\w+);base64,/', $base64);

        if ($checkBase64Image || $checkBase64Audio) {
            if ($pathOldPublic) $this->deleteFile($pathOldPublic);
            $data = substr($base64, strpos($base64, ',') + 1);
        
            $data = base64_decode($data);
            Storage::disk('local')->put($pathPublic, $data);
        }

    }

    public function deleteFile($pathOldPublic) {
        Storage::delete($pathOldPublic);
    }
}
