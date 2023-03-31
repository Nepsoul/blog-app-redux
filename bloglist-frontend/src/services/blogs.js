import axios from "axios";
const baseUrl = "/api/blogs";
//const userUrl = "http://localhost:3003/api/users"; //if in json file proxy has not been given this url
const userUrl = "/api/users";
const commentUrl = `/api/comments`;

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getAllUsers = async () => {
  const request = await axios.get(userUrl);
  return request.data;
};

const getComments = async (id) => {
  const request = await axios.get(`${commentUrl}/${id}`);
  return request.data;
};

const createComments = async (id, newObject) => {
  //console.log("newObject", newObject);
  //console.log("id", id);
  const response = await axios.post(`${commentUrl}/${id}`, newObject);

  return response.data;
};

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  getAllUsers,
  getComments,
  createComments,
};
