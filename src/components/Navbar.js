import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">PartyHouse</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Find Friends</Link>
        <Link to="/parties" className="nav-link">House Parties</Link>
        <Link to="/requests" className="nav-link">Friend Requests</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
