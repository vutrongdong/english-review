<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

/**
 * UserService
 */
class UserService
{
    /**
     * get Users
     *
     * @return void
     */
    public function getUsers()
    {
        $users = $this->searchUser();
        return $users->DataTablePaginate();
    }

    /**
     * search users
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function searchUser()
    {
        $query = User::query()->with(['city', 'district']);

        collect(request()->all())->each(function($queryValue, $queryType) use($query){
            if (!$queryValue) {
                return;
            }

            switch($queryType) {
                case 'keyword':
                    $query->where(function($query) use($queryValue){
                        $query->where('name', 'LIKE', "%{$queryValue}%");
                        $query->orWhere('email', 'LIKE', "%{$queryValue}%");
                        $query->orWhere('phone', 'LIKE', "%{$queryValue}%");
                    });
                    break;

                case 'city_id':
                    $query->whereHas('city', function ($query) use ($queryValue){
                        $query->where('cities.id', '=', $queryValue);
                    });
                    break;

                case 'district_id':
                    $query->whereHas('district', function ($query) use ($queryValue){
                        $query->where('districts.id', '=', $queryValue);
                    });
                    break;
            }
        });

        return $query;
    }

    /**
     * get UserId
     *
     * @param  int $id
     * @return void
     */
    public function info($id)
    {
        $user = User::findOrFail($id);

        return $user;
    }

    /**
     * create user
     *
     * @param  array $data
     * @return void
     */
    public function createUser($data)
    {
        $user = User::create($data);
        return $user;
    }

    /**
     * create user
     *
     * @param  array $data
     * @return void
     */
    public function editUser($data)
    {
        $user = User::findOrFail($data['id'])->update($data);
        return $user;
    }

    /**
     * delete Users
     *
     * @param  mixed $id
     * @return void
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        return $user->delete();
    }
    /**
     * register user
     *
     * @param  mixed $id
     * @return void
     */
    public function register($data)
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => '',
            'password' => Hash::make($data['password']),
        ]);
        $token = $user->createToken($data['email'])->accessToken;
        
        return ['token' => $token, 'user' => $user];
    }
}
