<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected function authenticated($request, $user)
    {
        if ($user->role === 'member') {
            return redirect('/');
        }
        return redirect(RouteServiceProvider::HOME);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if (\Auth::attempt($credentials)) {
            $user = \Auth::user();
            if ($request->returnReponse) {
                $token = $user->createToken($user->email)->accessToken;
                $response = ['token' => $token, 'user' => $user];
                return response($response, 200);
            }
            return $this->authenticated($request, $user);
        }

        if ($request->returnReponse) {
            throw ValidationException::withMessages(['email' => 'Oppes! You have entered invalid credentials']);
        }

        return redirect('login')->with('error', 'Oppes! You have entered invalid credentials');
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    /**
     * logout api for web.
     *
     * @return void
    */
    public function logoutApi()
    {
        if (auth()->guard('api')->check()) {
            authApi()->AauthAcessToken()->delete();
        }
    }
}
