import { message } from 'antd';
import * as service from '../services/posts';

export default {
  namespace: 'posts',

  state: {
    loading: false,
    posts: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'fetchData',
          });
        }
      });
    },
  },
  effects: {
    *fetchData(action, { call, put }) {
      try {
        yield put({
          type: 'showLoading',
        });
        const result = yield call(service.fetPosts);
        yield put({
          type: 'ShowData',
          payload: result.data,
        });
      } catch (error) {
        yield put({
          type: 'Error',
        });
      }
    },
    *delete(action, { call, put }) {
      try {
        const result = yield call(
          service.deletePosts,
          action.payload,
        );
        if (result) {
          message.success('Delete Success');
          yield put({
            type: 'DELETE_SUCCESS',
            payload: action.payload,
          });
        }
      } catch (error) {
        yield put({
          type: 'Error',
        });
      }
    },
    *create(action, { call, put }) {
      try {
        const result = yield call(service.addPosts, action.payload);
        if (result) {
          message.success('Create Success');
          yield put({
            type: 'CREATE_SUCCESS',
            payload: result.data,
          });
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    *pdate(action, { call, put }) {
      try {
        const result = yield call(
          service.updatePosts,
          action.payload,
        );
        if (result) {
          message.success('Update Success');
          yield put({
            type: 'UPDATE_SUCCESS',
            payload: result.data,
          });
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
  },

  reducers: {
    showLoading(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    ShowData(state, action) {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    },
    DELETE_SUCCESS(state, action) {
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.payload),
      };
    },
    CREATE_SUCCESS(state, action) {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    },
    UPDATE_SUCCESS(state, action) {
      return {
        ...state,
        posts: state.posts.map(item =>
          item.id === action.payload.id ? action.payload : item,
        ),
      };
    },
  },
};
