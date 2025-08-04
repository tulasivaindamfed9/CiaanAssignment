import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <>  
     <Header />
      <main className="container mx-auto px-4 py-4">
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
     
    
  );
}

export default App;