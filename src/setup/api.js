import axios from 'axios';

const api = axios.create({
    baseURL: `https://api.github.com/`,
    headers: {
        'Authorization': 'token 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'
    }
});
  
export default api;