import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="logo">
        <span>TaskFlow</span>
      </div>
      
      <div className="profile" ref={menuRef}>
        <div className="profile-info" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="avatar">{user?.name?.charAt(0)}</div>
          <div className="details">
            <span className="name">{user?.name}</span>
            <span className="email">{user?.email}</span>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile Settings</Link>
            <button onClick={logout}>Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
}