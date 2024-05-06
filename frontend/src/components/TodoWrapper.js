import React, {useEffect, useState} from 'react';
import {TodoForm} from './TodoForm';
import {Todo} from './Todo';
import axios from 'axios';

import {EditTodoForm} from './EditTodoForm';

// {id: xx, task: xx, completed: xx, isEditing:xx }
export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const fetchData = async () => {
    const result = await axios.get('http://localhost:3001/');
    setTodos(result.data);
  };
  // const fetchDataById = async (id) => {
  //   const result = await axios.get(`http://localhost:3001/${id}`);
  //   console.log('fetchDataById', result);
  // };
  useEffect(() => {
    fetchData();
  }, []);
  const addTask = async (todo) => {
    const result = await axios.post(`http://localhost:3001/add`, todo);
    setTodos([...todos, result.data]);
  };

  //   const editTodo = ()=>{
  //  const updatedIndex = (todo.id)
  //   }
  const deletedTodo = async (_id) => {
    const result = await axios.delete(`http://localhost:3001/delete/${_id}`);
    setTodos((todos) => todos.filter((todo) => todo._id !== result.data._id));

    console.log(result, 'result');
    // const deleteIndex = todos.findIndex((todo) => todo.id === id);
    // // 不能直接操作todos
    // // const newTodos = [...todos]
    // // newTodos.splice(deleteIndex,1)

    // // setTodos(newTodos);
    // //slice
    // const newTodos = [...todos.slice(0, deleteIndex), ...todos.slice(deleteIndex + 1, todos.length)];
    // console.log('newTodos', newTodos);

    // setTodos(newTodos);
  };

  const handleCompleted = (_id) => {
    const completedIndex = todos.findIndex((todo) => todo._id === _id);

    const newTodos = [...todos];
    newTodos[completedIndex].completed = !todos[completedIndex].completed;

    setTodos(newTodos);
  };
  const editTodo = (_id) => {
    const editIndex = todos.findIndex((todo) => todo._id === _id);
    const newTodos = [...todos];
    newTodos[editIndex].isEditing = !todos[editIndex].isEditing;
    setTodos(newTodos);
  };
  const updateTodo = async (value, _id) => {
    const result = await axios.post('http://localhost:3001/update', {task: value, _id: _id});
    const updatedIndex = todos.findIndex((todo) => todo._id === _id);
    const newTodos = [...todos];
    newTodos[updatedIndex].task = result.data.task;
    newTodos[updatedIndex].isEditing = false;
    setTodos(newTodos);

    // console.log('updatedIndex', updatedIndex);
    // const newTodos = [...todos];
    // // [2,4,6,8]
    // // [{a: { b: 33}}]
    // newTodos[updatedIndex].task = value;
    // console.log(value, 'new incoming value');
    // newTodos[updatedIndex].isEditing = false;
    // console.log('newTodos', newTodos);
    // setTodos(newTodos);
  };
  return (
    <div className='TodoWrapper'>
      <TodoForm addTask={addTask} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm todo={todo} key={todo._id} updateTodo={updateTodo} />
        ) : (
          <Todo todo={todo} key={todo._id} deletedTodo={deletedTodo} handleCompleted={handleCompleted} editTodo={editTodo} />
        )
      )}
    </div>
  );
};
