import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Header.css'; // Import the CSS file

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
         Welcome to LinkedIn
        </Link>
        
        <nav className="nav-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
              <button
                onClick={logout}
                className="logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;