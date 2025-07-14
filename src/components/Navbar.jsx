import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand mb-0 h1">
          Home
        </Link>

        <Link to="/add" className="btn btn-primary">
          Add New Contact
        </Link>
      </div>
    </nav>
  );
};
