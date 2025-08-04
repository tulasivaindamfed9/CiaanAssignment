import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      setLoading(true);
      await register({ name, email, password, bio });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div>
          <h2 className="register-title">
            Create a new account
          </h2>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field rounded-top"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="bio" className="sr-only">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="2"
                className="textarea-field"
                placeholder="Tell us about yourself (optional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="register-button"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="login-text">Already have an account? </span>
          <Link to="/login" className="login-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;