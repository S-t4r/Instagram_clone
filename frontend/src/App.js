import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import UserProfile from './users/UserProfile';
import Register from './users/Register';
import Login from './users/Login'
import ProtectedRoute from './userContext/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Users Application */}
          <Route path="/users/profile" element={<UserProfile />} />
          <Route
            path="/users/login"
            element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
            }
          />
          <Route
            path="/users/register"
            element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
