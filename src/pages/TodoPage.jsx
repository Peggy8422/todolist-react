import { useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

let nextTodoId = 4;

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(dummyTodos)

  //新增todo的輸入框輸入值改變時的事件處理
  const handleChange = (value) => {
    setInputValue(value);
  } 
  //按下"新增"按鈕或是"Enter"鍵時的事件處理
  const handleTodoAdded = () => {
    if (inputValue.trim().length === 0) {
      alert('Please type in valid text!');
      return
    };
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: nextTodoId++,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    setInputValue('');
  }
  //切換完成/未完成狀態的事件處理
  const handleToggleDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    });
  }
  //切換成編輯模式的事件處理
  const handleChangeMode = ({id, isEdit}) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit
          };
        }
        return {
          ...todo,
          isEdit: false,
        };
      })
    });
  }
  //儲存編輯過的todo項目的事件處理
  const handleSave = ({id, title}) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false //在這裡才把編輯完成的TodoItem跳出編輯模式
          };
        }
        return todo;
      })
    });
  }


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
      />
      <Footer />
    </div>
  );
};

export default TodoPage;
