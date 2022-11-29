import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

// 登入請求的函式模組
export const login = async ({username, password}) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });
    //從data取得authToken
    const { authToken } = data;
    //如果登入成功，立success的flag來判斷
    if (authToken) {
      return {success: true, ...data};
    }
    //沒登入成功直接回傳data
    return data;
  } catch (error) {
    console.error('[Login Failed]: ', error);
  }
};

// 註冊請求的函式模組
export const register = async ({username, email, password}) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      email,
      password,
    });
    const { authToken } = data;
    // 成功
    if (authToken) {
      return {success: true, ...data};
    }
    // 沒成功
    return data;
  } catch (error) {
    console.error('[Register Failed]: ', error);
  }

};

// 驗證登入Token的函式模組
export const checkPermission = async (authToken) => {
  try {
    const response =  await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;

  } catch (error) {
    console.error('[Check Permission Failed]: ', error);
  }
};