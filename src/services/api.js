import axios from 'axios';

export const getStudyGroups = async () => {
  const response = await axios.get('http://localhost:3000/groups/');
  return response.data;
};

export const getStudyGroup = async (id) => {
  const response = await axios.get(`http://localhost:3000/groups/${id}`);
  return response.data;
};

export const postStudyGroup = async (post) => {
  const response = await axios.post('http://localhost:3000/groups/', post);
  return response.data;
};
