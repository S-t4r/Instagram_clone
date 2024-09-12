import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import Users from './users/Users';
import Posts from './posts/Posts';

import './App.css';

function App() {
  // To reload the Header
  const [headerKey, setHeaderKey] = useState(0);
    
  return (
    <Router>
      <Layout headerKey={headerKey}>
        <Routes>
          {/* Users Application */}
          <Route path="/users/*" element={<Users setHeaderKey={setHeaderKey} />} />
          <Route path="/posts/*" element={<Posts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
