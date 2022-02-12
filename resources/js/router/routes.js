import { categories } from '@/router/categories';
import { users } from '@/router/users';
import { blogs } from '@/router/blogs';
import { tests } from '@/router/tests';

export const routes = [
    ...categories,
    ...blogs,
    ...users,
    ...tests,
]