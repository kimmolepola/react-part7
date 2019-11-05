import axios from 'axios';

const baseUrl = 'https://tranquil-bayou-44537.herokuapp.com/api/login';

const login = async (credentials) => {
  try{
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (exception) {
    console.log('HERE IS MESSAGE', exception);

  }

};

export default { login };
