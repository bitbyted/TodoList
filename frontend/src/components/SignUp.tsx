import {useState} from 'react';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async ({email, password}) => {
    if (email.includes('@') && password.length >= 6) {
      const result = await axios.post('http://localhost:3001/register', {email, password});
      console.log(result);
      setEmail('');
      setPassword('');
    } else {
      setIsDisabled(true);
    }
  };
  return (
    <div className='LoginForm'>
      <h2>SignUp</h2>
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

export default SignUp;
