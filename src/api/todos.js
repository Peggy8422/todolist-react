//API 串接設定檔
import axios from 'axios';
const baseUrl = 'https://todo-list.alphacamp.io/api';

//使用axios實例搭配interceptors方法，在發出 request 前、收到 response 後產生一些時間差，讓我們可以設定 Auth Token
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// 在發出 request 前：
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.errpr(error)
  }
);


// "讀取全部Todos"的函式模組
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    return res.data.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};

//"新增一筆Todo"的函式模組 *payload代表打包過後的資料(一包物件，可解構賦值取得內部資料)
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axiosInstance.post(`${baseUrl}/todos/`, {
      title,
      isDone,
    })
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ',error);
  }
};

//"修改一筆Todo"的函式模組
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload;
  try {
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Patch Todo failed]: ', error);
  }
};

//"刪除一筆Todo"的函式模組
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todo/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Delete Todo failed]:', error);
  }
};
