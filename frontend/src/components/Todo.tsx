import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {TodoProps} from './TodoWrapper';

interface NewTodoProps {
  todo: TodoProps;
  handleEditTodo: (_id: string) => void;
  handleDeletedTodo: (_id: string) => void;
  handleCompleted: (_id: string, completed: boolean) => void;
}

export const Todo = ({todo, handleEditTodo, handleDeletedTodo, handleCompleted}: NewTodoProps) => {
  return (
    <div className='Todo'>
      <p onClick={() => handleCompleted(todo._id, todo.completed)} className={`${todo.completed ? 'completed' : 'incompleted'}`}>
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => handleEditTodo(todo._id)} />
        <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => handleDeletedTodo(todo._id)} />
      </div>
    </div>
  );
};
