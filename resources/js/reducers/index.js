import categories from '@/reducers/categories';
import commons from '@/reducers/commons';
import { combineReducers } from 'redux';
import users from '@/reducers/users';
import blogs from '@/reducers/blogs';
import tests from '@/reducers/tests';
import auth from '@/reducers/auth';

export default combineReducers({
  categories: categories,
  commons: commons,
  blogs: blogs,
  users: users,
  tests: tests,
  auth: auth,
});
