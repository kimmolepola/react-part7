import axios from 'axios';


const baseUrl = '/api/blogs';

let config;

const setConfig = (t) => {
  config = {
    headers: { Authorization: `bearer ${t}` },
  };
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

const put = async (content) => {
  const response = await axios.put(`${baseUrl}/${content.id}`, content, config);
  return response.data;
};

const create = async (content) => {
  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default {
  getAll, setConfig, create, put, remove,
};
