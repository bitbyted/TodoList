import {useEffect, useState} from 'react';
import {TodoForm} from './TodoForm';
import {Todo} from './Todo';
import {fetchData, editTodo, addNewTodo, AddedTodo, updateTodo, deleteTodo, completeTodo} from '../store/todosSlices';
import {useAppSelector, useAppDispatch} from '../store/hooks';

import {EditTodoForm} from './EditTodoForm';

export interface TodoProps {
  _id: string;
  task: string;
  isEditing: Boolean;
  completed: Boolean;
}

export const TodoWrapper = () => {
  const todosFromRedux = useAppSelector((state) => state.todosSlice.todos);
  console.log('todosFromRedux', todosFromRedux);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData()).unwrap();
  }, [dispatch]);

  const addTask = async (todo: AddedTodo) => {
    dispatch(addNewTodo(todo));
    // const result = await axios.post(`http://localhost:3001/add`, todo);
    // setTodos([...todos, result.data]);
  };

  const handleDeletedTodo = async (_id: string) => {
    dispatch(deleteTodo(_id));
  };

  const handleCompleted = (_id: string, completed: boolean) => {
    dispatch(completeTodo({_id, completed}));
  };
  const handleEditTodo = (todo) => {
    dispatch(editTodo(todo));
  };
  const handleUpdateTodo = async (value: string, _id: string) => {
    dispatch(updateTodo({value, _id}));
  };

  return (
    <div className='TodoWrapper'>
      <TodoForm addTask={addTask} />
      {todosFromRedux.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm todo={todo} key={todo._id} handleUpdateTodo={handleUpdateTodo} />
        ) : (
          <Todo todo={todo} key={todo._id} handleDeletedTodo={handleDeletedTodo} handleCompleted={handleCompleted} handleEditTodo={handleEditTodo} />
        )
      )}
    </div>
  );
};
