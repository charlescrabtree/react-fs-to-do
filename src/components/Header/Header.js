import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);  
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  return (
    <header>
      <h1 className='title'>Todos</h1>
      {!user && (
        <div className='auth-links'>
          <NavLink className='auth-sign-in' to='/auth/sign-in'>Sign In</NavLink>
          <NavLink className='auth-sign-up' to='/auth/sign-up'>Sign Up</NavLink>
        </div>

      )}
      {user && (
        <div className='user-info'>
          <h3>hey there {user.email}</h3>
          <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </header>
  );
}