import {useState} from 'react';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

const LoginButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className='login-btn' onClick={() => setOpen((prev) => !prev)}>
        Login
      </button>
      {open && <LoginForm />}

      <SignUp />
    </div>
  );
};

export default LoginButton;
