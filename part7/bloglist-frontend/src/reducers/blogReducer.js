import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlogs(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    likeBlog(state, action) {
      state = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
      return state;
    },
    removeBlog(state, action) {
      state = state.filter((blog) => (blog.id === action.payload ? '' : blog));
      return state;
    }
  }
});
export const { appendBlogs, setBlogs, likeBlog, removeBlog } =
  blogSlice.actions;

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    dispatch(appendBlogs(response));
  };
};
export const incrementLike = (id, blog) => {
  return async (dispatch) => {
    const response = await blogService.update(id, blog);
    dispatch(likeBlog(response));
  };
};
export const eraseBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.erase(id);
    dispatch(removeBlog(id));
  };
};
export default blogSlice.reducer;
