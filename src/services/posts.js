import axios from 'axios';
// const env = process.env || {};
const ROOT_URL = process.env.LINK_API;

export function fetPosts() {
  const request = axios.request({
    url: `${ROOT_URL}api/posts`,
    method: 'GET',
  });
  return request;
}
export function deletePosts(action) {
  const request = axios.request({
    url: `${ROOT_URL}api/posts/${action}/`,
    method: 'DELETE',
  });
  return request;
}
export function addPosts(action) {
  const request = axios.request({
    url: `${ROOT_URL}api/posts/`,
    method: 'POST',
    data: action,
  });
  return request;
}
export function updatePosts(action) {
  const request = axios.request({
    url: `${ROOT_URL}api/posts/${action.id}/`,
    method: 'PUT',
    data: action,
  });
  return request;
}
