import {useState} from 'react';
import axios from 'axios';

const LoginForm = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async ({email, password}) => {
    if (email.includes('@') && password.length >= 6) {
      const result = await axios.post('http://localhost:3001/login-user', {email, password});
      // navigate('/userdetail');
      console.log(result);
      if (result.status === 201) {
        alert('login successful');
        window.localStorage.setItem('token', result.data.data);
        window.location.href = '/userdetail';
      }
      setEmail('');
      setPassword('');
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <div className='LoginForm'>
      <label>
        Email:
        <input type='email' className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className='login-btn' onClick={() => handleSubmit({email, password})} disabled={isDisabled}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
