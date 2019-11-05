import axios from 'axios';

const baseUrl = `https://tranquil-bayou-44537.herokuapp.com/api/login`;

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { login };
