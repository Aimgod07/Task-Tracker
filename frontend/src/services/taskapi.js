
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

// Attach JWT
API.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");

if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
    return config;
});

export const searchTasks = (query) => {
    return API.get(`/search?query=${query}`);
};

export const sortTasks = (sortBy, order) => {
    return API.get(`/sort?sortBy=${sortBy}&order=${order}`);
};

///apis

export const registerUser = (userData) => {
    return API.post("/auth/register", userData);
};

export const loginUser = (userData) => {
    return API.post("/auth/login", userData);
};


const API_BASE_URL = 'http://localhost:5000';

export const getTasks = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/api/tasks${queryString ? `?${queryString}` : ''}`;
    
    console.log('🔗 Fetching from:', url);

    const token = localStorage.getItem('token');   // or sessionStorage, context, etc.

    const res = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      }
    });

    console.log('✅ Tasks received:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ API Error:', error.response?.status, error.response?.data);
    throw error;
  }
};


export const createTask = (task) => {
    return API.post("/tasks/create", task);
};

export const updateTask = async(taskId, data) => {
    try{
       const res= await API.put(`/tasks/update/${taskId}`, data);
       return res.data
    }
    catch(error){
        console.error('update ai error',error.response?.data)
    }
}
export const logoutUser = () => {
    return API.post("/auth/logout");
}
export const getTaskById=(taskId)=>{
    return API.get(`/tasks/${taskId}`)
}

export const deleteTask=(taskId)=>{
    return API.delete(`/tasks/delete/${taskId}`);
    return res.data;
}



export default API;