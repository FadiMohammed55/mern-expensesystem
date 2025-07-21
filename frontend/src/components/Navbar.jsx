import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          ExpenseTracker
        </Link>
      </div>
      <div className="flex-none space-x-3">
        {user ? (
          <>
            <span className="font-semibold">{user.username}</span>
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
