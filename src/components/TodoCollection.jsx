import TodoItem from './TodoItem';

const TodoCollection = ({
  todos,
  onSave,
  onDelete,
  onToggleDone,
  onChangeMode,
}) => {
  return (
    <div>
      {todos.map(todo => 
        <TodoItem key={todo.id} todo={todo} />
      )}
    </div>
  );
};

export default TodoCollection;
