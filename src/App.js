import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'

import { UserProvider } from './userContext/UserContext';
import Layout from './layout/Layout';
import Users from './users/Users';
import Posts from './posts/Posts';
import Home from './home/Home';
import Notifications from './notifications/Notifications';
import Direct_messages from './direct_messages/Direct_messages';

import './App.css';
import Search from './search/Search';

function App() {
  // To reload the Header
  const [headerKey, setHeaderKey] = useState(0);
    
  return (
    <UserProvider>
      <Router>
        <Layout headerKey={headerKey}>
          <Routes>
            {/* Users Application */}
            <Route path="/users/*" element={<Users setHeaderKey={setHeaderKey} />} />
            <Route path="/posts/*" element={<Posts />} />
            <Route path="/notifications/*" element={<Notifications />} />
            <Route path="/direct_messages/*" element={<Direct_messages />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;
