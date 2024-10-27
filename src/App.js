import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FriendFinder from './components/FriendFinder';
import HouseParties from './components/HouseParties';
import Profile from './components/Profile';
import FriendRequests from './components/FriendRequests';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<FriendFinder />} />
          <Route path="/parties" element={<HouseParties />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<FriendRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
