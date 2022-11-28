//API 設定檔
import axios from 'axios';
const baseUrl = 'http://localhost:3001';

// "讀取全部Todos"的函式模組
export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);
    return res.data;
  } catch (error) {
    console.error('[Get Todos failed]: ', error);
  }
};
//"新增一筆Todo"的函式模組 *payload代表打包過後的資料(一包物件，可解構賦值取得內部資料)
export const createTodo = async (payload) => {
  const { title, isDone } = payload;
  try {
    const res = await axios.post(`${baseUrl}/todos/`, {
      title,
      isDone,
    })
    return res.data;
  } catch (error) {
    console.error('[Create Todo failed]: ',error);
  }
};
export const patchTodo = () => {};
export const deleteTodo = () => {};
