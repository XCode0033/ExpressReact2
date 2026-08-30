import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const NavBar = () => {
  const { user, logout, loading } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: "10px 16px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/dreams">Dreams</Link>
      <Link to="/books">Books</Link>

      <span style={{ marginLeft: "auto" }}>
        {loading ? (
          "…"
        ) : user ? (
          <>
            Username: {user.username ?? user.email}{" "}
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </span>
    </nav>
  );
};

export default NavBar;
