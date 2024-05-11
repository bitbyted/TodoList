import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {TodoProps} from './TodoWrapper';

interface AnotherTodoProps {
  handleEditTodo: (todo: TodoProps) => void;
  handleDeletedTodo: (id: string) => void;
  handleCompleted: (id: string, completed: Boolean) => void;
  todo: TodoProps;
}

export const Todo = ({todo, handleEditTodo, handleDeletedTodo, handleCompleted}: AnotherTodoProps) => {
  return (
    <div className='Todo'>
      <p onClick={() => handleCompleted(todo._id, todo.completed)} className={`${todo.completed ? 'completed' : 'incompleted'}`}>
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => handleEditTodo(todo)} />
        <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => handleDeletedTodo(todo._id)} />
      </div>
    </div>
  );
};
