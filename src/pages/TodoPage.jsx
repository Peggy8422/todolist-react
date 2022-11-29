import { useState, useEffect } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { createTodo, deleteTodo, getTodos, patchTodo } from 'api/todos';
import { useNavigate } from 'react-router-dom';
import { checkPermission } from 'api/auth';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  // 進入Todo頁面前驗證Token是否存在和有效
  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login');
      }
      const result = await checkPermission(authToken);
      if (!result) {
        navigate('/login');
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  //新增todo的輸入框輸入值改變時的事件處理
  const handleChange = (value) => {
    setInputValue(value);
  };
  //按下"新增"按鈕或是"Enter"鍵時的事件處理
  const handleTodoAdded = async () => {
    if (inputValue.trim().length === 0) {
      alert('Please type in valid text!');
      return;
    }
    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };
  //切換完成/未完成狀態的事件處理
  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      const data = await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: data.isDone,
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  //切換成編輯模式的事件處理
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return {
          ...todo,
          isEdit: false,
        };
      });
    });
  };
  //儲存編輯過的todo項目的事件處理
  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false, //在這裡才把編輯完成的TodoItem跳出編輯模式
            };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  //刪除todo的'X'按鈕被點擊的事件處理
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleTodoAdded}
        onKeyDown={handleTodoAdded}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
