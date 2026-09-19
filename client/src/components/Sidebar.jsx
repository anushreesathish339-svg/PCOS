import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaRobot,
  FaHeartbeat,
  FaAppleAlt,
  FaDumbbell,
  FaChartLine,
  FaHistory,
  FaUser,
  FaPills,
  FaBell,
  FaFlask,
  FaSignOutAlt,
  FaClipboardCheck,
} from "react-icons/fa";

import "./Sidebar.css";
import { useLanguage } from "../context/LanguageContext";

function Sidebar() {
  const { t } = useLanguage();

  const navigate = useNavigate();

  const storedUser =
    localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("prediction");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("prediction");

    navigate("/login");

  };

  return (

    <div className="sidebar">

      <div className="sidebar-header">

        <h2><span className="brand-mark">✦</span> PCOS Care</h2>

        <p>{user?.fullName || "Welcome User"}</p>

      </div>

      <div className="sidebar-menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaHome />
          <span>{t("dashboard")}</span>
        </NavLink>

        <NavLink
          to="/prediction"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaRobot />
          <span>{t("prediction")}</span>
        </NavLink>



        <NavLink
          to="/cycle"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaHeartbeat />
          <span>{t("cycle")}</span>
        </NavLink>

        <NavLink
          to="/symptoms"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaHeartbeat />
          <span>{t("symptoms")}</span>
        </NavLink>

        <NavLink
          to="/medication"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaPills />
          <span>{t("medication")}</span>
        </NavLink>

        <NavLink
          to="/reminders"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaBell />
          <span>{t("reminders")}</span>
        </NavLink>

        <NavLink
          to="/diet"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaAppleAlt />
          <span>{t("diet")}</span>
        </NavLink>

        <NavLink
          to="/yoga"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaDumbbell />
          <span>{t("yoga")}</span>
        </NavLink>

        <NavLink
          to="/labreports"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaFlask />
          <span>{t("labs")}</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaChartLine />
          <span>{t("analytics")}</span>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaHistory />
          <span>{t("history")}</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          <FaUser />
          <span>{t("profile")}</span>
        </NavLink>

      </div>

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>{t("logout")}</span>
        </button>

      </div>

    </div>

  );

}

export default Sidebar;
