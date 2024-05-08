import {useState} from 'react';

import {TodoProps} from './TodoWrapper';

interface EditTodoFormProps {
  updateTodo: (value: string, _id: string) => void;
  todo: TodoProps;
}

export const EditTodoForm = ({todo, updateTodo}: EditTodoFormProps) => {
  // TODO: 为什么这个todo.value在组件mount的时候是undefined
  const [value, setValue] = useState(todo.task ?? '');
  // ? :
  return (
    <div className='TodoForm'>
      <input type='text' value={value} onChange={(e) => setValue(e.target.value)} className='todo-input' />
      <button
        className='todo-btn'
        onClick={() => {
          updateTodo(value, todo._id);
          setValue('');
        }}>
        Update todo
      </button>
    </div>
  );
};
