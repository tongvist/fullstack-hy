import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
}

const saveVote = async (id, content, votesBefore) => {
  const endpoint = `${baseUrl}/${id}`;
  const data = { content, votes: votesBefore + 1}
  
  const response = await axios.put(endpoint, data);
  return response.data.votes;
}

export default { getAll, createNew, saveVote };