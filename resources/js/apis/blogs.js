import { apiRequest } from '@/apis/apiRequest';
import { buildParams } from '@/commons/helpers/pagination';
import { toastSuccess } from '@/commons/helpers/toastHelper';

export const getBlogs = async (params) => {
    const paramsUrl = buildParams(params);
    window.history.pushState('', '', paramsUrl);
    const path = `/api/blogs${paramsUrl}`;
    const blogs = await apiRequest(path, 'get');
    return blogs;
};

export const getBlog = async (id) => {
    const blog = await apiRequest(`/api/blogs/${id}`, 'get');
    return blog.data;
};

export const getByBlogSlug = async (slug) => {
    const blog = await apiRequest(`/api/blogs/${slug}`, 'get');
    return blog.data;
};

export const deleteBlog = async (id) => {
    await apiRequest(`/api/blogs/${id}`, 'delete');
    toastSuccess('Xóa bài viết thành công');
};

export const createBlog = async (data) => {
    const result = await apiRequest(`/api/blogs/create`, 'post', data);
    return result;
};

export const editBlog = async (data) => {
    const result = await apiRequest(`/api/blogs/edit`, 'post', data);
    return result;
};

export const uploadImage = async (data) => {
    const result = await apiRequest(`/api/blogs/upload`, 'post', data);
    return result;
};
