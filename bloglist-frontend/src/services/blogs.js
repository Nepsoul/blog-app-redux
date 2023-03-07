import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log(newObject, "apinewOnj");
  const config = {
    headers: { Authorization: token },
  };
  console.log("create api");
  const response = await axios.post(baseUrl, newObject, config);
  console.log(response, "api response");
  console.log(response.data, "response.data");
  return response.data;
};

const update = async (id, newObject) => {
  //console.log(newObject, "from update api");
  const config = {
    headers: { Authorization: token },
  };
  console.log("this is put api");
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  console.log(response, "response from service put api");
  console.log(response.data, "response.data of put api");
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
export default { getAll, create, setToken, update, remove };
