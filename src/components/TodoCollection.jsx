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
        <TodoItem key={todo.id} todo={todo} onToggleDone={(id) => {
          onToggleDone?.(id);
        }} />
      )}
    </div>
  );
};

export default TodoCollection;
