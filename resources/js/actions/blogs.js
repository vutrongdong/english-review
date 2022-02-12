import * as blogConst from '@/constants/blogs';

export const getBlogs = (params) => ({
    type: blogConst.FETCH_BLOG,
    payload: params
});

export const fetchListBlogSuccess = (categories) => ({
    type: blogConst.FETCH_BLOG_SUCCESS,
    payload: categories
});

export const fetchListBlogError = (error) => ({
    type: blogConst.FETCH_BLOG_ERROR,
    payload: error
});

export const deleteBlog = (id) => ({
    type: blogConst.DELETE_BLOG,
    payload: id
});