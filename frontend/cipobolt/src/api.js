const API_URL = 'http://localhost:3000';

const fetchClient = {
    get: async (endpoint) => await fetch(`${API_URL}${endpoint}`),
    post: async (endpoint, body) => await fetch(`${API_URL}${endpoint}`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }}),
    put: async (endpoint, body) => await fetch(`${API_URL}${endpoint}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }}),
    delete: async (endpoint) => await fetch(`${API_URL}${endpoint}`, { method: 'DELETE' })
};

export default fetchClient;