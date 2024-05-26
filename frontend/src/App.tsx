import './App.css';
import LoginForm from './components/LoginForm';
import {TodoWrapper} from './components/TodoWrapper';
import {UserDetail} from './components/UserDetail';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <div>
          <Link to='/'>Home</Link>
        </div>
        <div>
          <Link to='/login'>Login</Link>
        </div>

        <Routes>
          <Route path='/' element={<TodoWrapper />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/userdetail' element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
