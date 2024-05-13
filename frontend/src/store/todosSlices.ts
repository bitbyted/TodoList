import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {TodoProps} from '../components/TodoWrapper';
import axios from 'axios';

export type AddedTodo = Omit<TodoProps, '_id'>;
export type TodoState = {
  todos: TodoProps[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: TodoState = {
  todos: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
};

const GET_URL = 'http://localhost:3001';
const POST_URL = 'http://localhost:3001/add';
const UPDATE_URL = 'http://localhost:3001/update';
const DELETE_URL = `http://localhost:3001/delete/`;
const COMPLETE_URL = 'http://localhost:3001/complete/';

export const fetchData = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(GET_URL);
  return response.data;
});

export const addNewTodo = createAsyncThunk('todos/postTodos', async (addedTodo: AddedTodo) => {
  const response = await axios.post(POST_URL, addedTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodos', async ({value, _id}: {value: string; _id: string}) => {
  const response = await axios.post(UPDATE_URL, {task: value, _id: _id});
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (_id: string) => {
  const response = await axios.delete(DELETE_URL + _id);
  return response.data;
});

export const completeTodo = createAsyncThunk('todos/completeTodo', async ({_id, completed}: {_id: string; completed: boolean}) => {
  const response = await axios.post(COMPLETE_URL + _id, {completed: completed, _id: _id});
  return response.data;
});

export const todosSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    editTodo: (state, {payload, type}: PayloadAction<TodoProps>) => {
      const updateIndex = state.todos.findIndex((todo) => todo._id === payload._id);
      state.todos[updateIndex].isEditing = !payload.isEditing;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(addNewTodo.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updateIndex = state.todos.findIndex((todo) => todo._id === action.payload._id);
        state.todos[updateIndex].isEditing = false;

        state.todos[updateIndex].task = action.payload.task;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = state.todos.filter((todo) => todo._id !== action.payload._id);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const completedIndex = state.todos.findIndex((todo) => todo._id === action.payload._id);
        state.todos[completedIndex].completed = action.payload.completed;
      })
      .addCase(completeTodo.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {editTodo} = todosSlice.actions;

export default todosSlice.reducer;
