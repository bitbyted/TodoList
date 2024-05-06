import {useState} from 'react';
import {TodoProps} from './TodoWrapper';
interface addTaskProps {
  addTask: (todo: NewTodo) => void;
}
type NewTodo = Omit<TodoProps, '_id'>;

export const TodoForm = ({addTask}: addTaskProps) => {
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
