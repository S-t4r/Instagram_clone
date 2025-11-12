import { Route, Routes } from 'react-router-dom';

import Edit from './Edit.js';
import Login from './Login.js'
import ProtectedRoute from '../userContext/ProtectedRoute';
import UserEditRoute from '../userContext/UserEditRoute.js';
import Register from './Register.js';
import Share from './Share.js';
import UserProfile from './UserProfile.js'

export default function Users({ setHeaderKey }) {
  return (
    <Routes>
      <Route path=":username" element={<UserProfile />} />
      <Route path="login" element={<ProtectedRoute><Login setHeaderKey={setHeaderKey} /></ProtectedRoute>} />
      <Route path="register" element={<ProtectedRoute><Register setHeaderKey={setHeaderKey} /></ProtectedRoute>} />
      <Route path=":username/edit" element={<UserEditRoute><Edit setHeaderKey={setHeaderKey} /></UserEditRoute>} />
      <Route path=":username/share" element={<Share />} />
    </Routes>
  );
}