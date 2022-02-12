<?php

namespace Modules\Api\Http\Controllers;

use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Validation\ValidationException;
use Modules\Api\Http\Requests\PasswordRequest;
use Modules\Api\Http\Requests\RegisterRequest;
use Modules\Api\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Services\UserService;

/**
 * UserController
 */
class UserController extends ApiController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $userService;

    /**
     * __construct
     *
     * @param  mixed $userService
     * @return void
     */
    public function __construct(UserService $userService)
    {
        parent::__construct();

        $this->userService = $userService;
    }

    /**
     * edit user
     *
     * @param  mixed $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function info($id)
    {
        $user = $this->userService->info($id);

        return $this->returnSuccess($user);
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = $this->userService->getUsers();

        return $this->returnSuccess($users);
    }

    /**
     * Display a user auth.
     * @return \Illuminate\Http\JsonResponse
    */
    public function getUserAuth()
    {
        return $this->returnSuccess(authApi());
    }

    /**
     * create user
     *
     * @param  mixed $request
     * @return void
     */
    public function create(UserRequest $request)
    {
        $data = $request->only('name', 'phone', 'email', 'address', 'city_id', 'district_id', 'date_of_birth', 'status', 'gender');
        
        return $this->userService->createUser($data);
    }

    /**
     * edit user
     *
     * @param  mixed $request
     * @return void
     */
    public function edit(UserRequest $request)
    {
        $data = $request->only('id', 'name', 'phone', 'email', 'address', 'city_id', 'district_id', 'date_of_birth', 'status', 'gender');
        
        return $this->userService->editUser($data);
    }

    /**
     * delete user
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $result = $this->userService->deleteUser($id);

        return $this->returnSuccess($result);
    }

    /**
     * Update your profile.
     * @param ProfileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(ProfileRequest $request)
    {
        $currentUser = Auth::user();
        $data = $request->only('email', 'name', 'notify_email', 'default_branch_id');
        if($request->icon && $request->is_update_icon){
            $newAvatarPath = 'avatar/users/' . uniqid('avatar_u_') . '.png';
            $this->uploadImageUtil->uploadImage(request('icon'), $newAvatarPath, $currentUser->icon);
            $data['icon'] = $newAvatarPath;
        }
        $user = $this->userService->updateProfile($currentUser, $data);

        return $this->returnSuccess($user);
    }

    /**
     * Update your login password.
     * @param PasswordRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(PasswordRequest $request)
    {
        $user = authUser() ?? authApi();
        if (!Auth::guard('web')->validate([
            'email' => $user->email,
            'password' => $request->current_password,
        ])) {
            throw ValidationException::withMessages(['current_password' => 'Current password is incorrect']);
        }

        $user->fill([
            'password' => Hash::make($request->password),
        ])->save();

        return $this->returnSuccess($user);
    }
    /**
     * register user
     *
     * @param  object $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $data = $request->only('name', 'email', 'password');
        $result = $this->userService->register($data);
        
        return $this->returnSuccess($result);
    }
}
