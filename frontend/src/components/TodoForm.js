import React, {useState} from 'react';

export const TodoForm = ({addTask}) => {
  const [value, setValue] = useState('');
  return (
    <div className='TodoForm'>
      <input type='text' placeholder='todo...' className='todo-input' onChange={(e) => setValue(e.target.value)} value={value} />
      <button
        className='todo-btn'
        onClick={() => {
          // addTodo(value);
          addTask({task: value, isEditing: false, completed: false});
          setValue('');
        }}>
        Add Task
      </button>
    </div>
  );
};
