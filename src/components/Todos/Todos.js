import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useTodos } from '../../hooks/useTodos';
import { newToDo } from '../../services/todos';
import Todo from '../Todo/Todo';

export default function Todos() {
  const { user } = useContext(UserContext);
  const { todos, setTodos } = useTodos();
  const [description, setDescription] = useState('');

  if (!user) return <Redirect to='/auth/sign-in' />;

  const handleAddTodo = async () => {
    const addNewToDo = await newToDo(description);
    setTodos((prevTodos) => [...prevTodos, addNewToDo]);
    setDescription('');
  };

  return (
    <div className='main'>
      <div className='add-todo'>
        <input type='text' placeholder='Did you forget something?' value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className='todos'>
        {todos.map(todo => <Todo key={todo.id} />)}
      </div>
    </div>
  );
}