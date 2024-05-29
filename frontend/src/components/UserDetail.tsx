import axios from 'axios';
import {useEffect} from 'react';

export const UserDetail = () => {
  const fetchUserDetail = async () => {
    const token = window.localStorage.getItem('token');
    const result = await axios.post('http://localhost:3001/userData', {token: token});
    if (result.data.status === 401) {
      alert('invalid info');
      window.location.href = '/login';
    }
    console.log(result, 'userdetail');
  };
  useEffect(() => {
    fetchUserDetail();
  }, []);
  return <div>UserDetail</div>;
};
