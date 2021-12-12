import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config);
  return request.data;
}

const update = async updatedBlog => {
  const endpoint = `${baseUrl}/${updatedBlog.id}`;
  
  const config = {
    headers: { Authorization: token }
  }

  const request = await axios.put(endpoint, updatedBlog, config);
  return request.data;
}

const deleteBlog = async id => {
  const endpoint = `${baseUrl}/${id}`;

  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(endpoint, config);
}

const blogService = { getAll, setToken, create, update, deleteBlog };

export default blogService;