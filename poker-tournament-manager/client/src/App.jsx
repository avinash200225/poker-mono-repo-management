import { BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import PlayerProfile from './pages/PlayerProfile';
import Tournaments from './pages/Tournaments';
import TournamentControl from './pages/TournamentControl';
import Tables from './pages/Tables';
import Sync from './pages/Sync';
import './App.css';

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <span className="logo-icon">♠</span>
          <span>Tournament Manager</span>
        </div>
        <ul className="nav-links">
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          <li><NavLink to="/tables">Tables</NavLink></li>
          <li><NavLink to="/players">Players</NavLink></li>
          <li><NavLink to="/tournaments">Tournaments</NavLink></li>
          <li><NavLink to="/sync">Data Sync</NavLink></li>
        </ul>
        <div className="sidebar-footer">
          <span className="user-email">{user?.email}</span>
          <button className="btn btn-sm btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main className="main"><Outlet /></main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerProfile />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id/control" element={<TournamentControl />} />
            <Route path="/sync" element={<Sync />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
