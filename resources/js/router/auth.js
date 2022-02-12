import ChangePassword from '@/components/web/auth/ChangePassword';
import SendEmailReset from '@/components/web/auth/SendEmailReset';
import ResetPassword from '@/components/web/auth/ResetPassword';
import Register from '@/components/web/auth/Register';
import Login from '@/components/web/auth/Login';

export const auth = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/change_password',
        name: 'change password',
        component: ChangePassword
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/password/reset',
        exact: true,
        name: 'send email reset password',
        component: SendEmailReset
    },
    {
        path: '/password/reset/:token',
        name: 'reset password',
        component: ResetPassword
    },
];