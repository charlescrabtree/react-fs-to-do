import { useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { authUser } from '../../services/Word';
import './Auth.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useParams();

  const { user, setUser } = useContext(UserContext);

  const useAuth = async () => {
    const userResp = await authUser(email, password, type);
    setUser(userResp);
    setEmail('');
    setPassword('');
  };
  
  if (user) return <Redirect to='/todos' />;

  return (
    <div className='container'>
      <div>
        <label className='label'>Email</label>
        
        <input className='input' type='text' placeholder='email@email.com' value={email} onChange={(e) => {
          setEmail(e.target.value);
        }} />
        
        <div>
          <label className='label'>Password</label>
          <input className='password' type='text' placeholder='Password please' value={password} onChange={(e) => {
            setPassword(e.target.value);
          }} />
        </div>
        <button className='button' onClick={useAuth}>Submit</button>
      </div>
    </div>

  );
}