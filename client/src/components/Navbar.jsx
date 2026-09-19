import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        <span className="logo-spark">✦</span>PCOS <span className="logo-accent">Care</span>
      </Link>

      <ul className="nav-links">
        <li><a href="#about">{t("about")}</a></li>
        <li><a href="#features">{t("features")}</a></li>
        <li><a href="#contact">{t("contact")}</a></li>
      </ul>

      {user ? (
        <div className="nav-buttons">
          <LanguageSelector compact />
          <Link className="login-btn" to="/dashboard">
            {user.fullName || "Dashboard"}
          </Link>
          <button className="register-btn nav-logout" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-buttons">
          <LanguageSelector compact />
          <Link className="login-btn" to="/login">{t("login")}</Link>
          <Link className="register-btn" to="/register">{t("register")}</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
