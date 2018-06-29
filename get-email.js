const axios = require('axios');

const API_URL = 'https://my-little-api.com';

const getEmail = async (orgId, userId) => {
  const url = `${API_URL}/org/${orgId}/user/${userId}`;
  const { data } = await axios.get({ url });
  return data.email || userId;
};

module.exports = { getEmail };
