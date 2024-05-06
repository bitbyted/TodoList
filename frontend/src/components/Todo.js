import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export const Todo = ({todo, editTodo, deletedTodo, handleCompleted}) => {
  return (
    <div className='Todo'>
      <p onClick={() => handleCompleted(todo._id)} className={`${todo.completed ? 'completed' : 'incompleted'}`}>
        {todo.task}
      </p>
      <div>
        <FontAwesomeIcon className='edit-icon' icon={faPenToSquare} onClick={() => editTodo(todo._id)} />
        <FontAwesomeIcon className='delete-icon' icon={faTrash} onClick={() => deletedTodo(todo._id)} />
      </div>
    </div>
  );
};
