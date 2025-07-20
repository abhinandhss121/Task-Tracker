
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './components/welcome';
import Login from './components/login';
import Register from './components/register';
import TaskFlow from './pages/dashboard';
import Navbar from './components/navbar';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const AppContent = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  const showNavbar = user && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar user={user} onLogout={logout} />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <TaskFlow />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
