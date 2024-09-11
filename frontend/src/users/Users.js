import { Route, Routes } from 'react-router-dom';

import Edit from './Edit.js';
import Login from './Login.js'
import ProtectedRoute from '../userContext/ProtectedRoute';
import Register from './Register.js';
import UserProfile from './UserProfile.js'

export default function Users({ setHeaderKey }) {
  return (
    <Routes>
      <Route path="profile" element={<UserProfile />} />
      <Route path="login" element={<ProtectedRoute><Login setHeaderKey={setHeaderKey} /></ProtectedRoute>} />
      <Route path="register" element={<ProtectedRoute><Register setHeaderKey={setHeaderKey} /></ProtectedRoute>} />
      <Route path="edit" element={<Edit setHeaderKey={setHeaderKey} />} />
    </Routes>
  );
  }