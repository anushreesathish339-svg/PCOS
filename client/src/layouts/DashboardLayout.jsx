import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaChevronRight } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

const searchIndex = [
  { title: "PCOS Risk Prediction", desc: "Run Machine Learning screening model", category: "Screening", path: "/prediction", keywords: ["prediction", "pcos", "screening", "risk", "predict", "test", "model"] },
  { title: "Prediction History & Logs", desc: "View past screening results and probability scores", category: "History", path: "/history", keywords: ["history", "past", "records", "date", "previous", "logs"] },
  { title: "Diagnostic Parameter Analysis", desc: "Granular breakdown of clinical markers (AMH, LH, FSH, BMI)", category: "Analysis", path: "/prediction-analysis", keywords: ["analysis", "breakdown", "amh", "lh", "fsh", "bmi", "insulin", "parameters"] },
  { title: "Cycle & Ovulation Tracker", desc: "Menstrual calendar, fertile window & ovulation log", category: "Cycle", path: "/cycle", keywords: ["cycle", "period", "ovulation", "fertile", "menstrual", "calendar", "date"] },
  { title: "Symptom Tracker Logs", desc: "Track acne, hair loss, weight gain & mood changes", category: "Symptoms", path: "/symptoms", keywords: ["symptoms", "acne", "hair loss", "hair thinning", "weight gain", "skin", "fatigue", "symptom"] },
  { title: "Medication & Prescriptions", desc: "Manage daily pills, dosage & prescriptions", category: "Medication", path: "/medication", keywords: ["medication", "medicine", "pills", "prescription", "metformin", "supplements", "dosage"] },
  { title: "Reminders & Alarm Schedules", desc: "Configure check-in alarms & medication notifications", category: "Reminders", path: "/reminders", keywords: ["reminders", "alarm", "schedule", "alert", "notifications", "time"] },
  { title: "Diet Plan & Calorie Counter", desc: "Nutritional guidelines & daily meal logging", category: "Diet", path: "/diet", keywords: ["diet", "nutrition", "food", "calories", "meal", "eating", "protein", "counter"] },
  { title: "Yoga & Exercise Plans", desc: "PCOS-friendly workouts, yoga poses & fitness", category: "Fitness", path: "/yoga", keywords: ["yoga", "exercise", "workout", "fitness", "poses", "stretching"] },
  { title: "Lab Reports & Diagnostic Scans", desc: "Upload and view clinical lab test reports", category: "Lab Tests", path: "/labreports", keywords: ["lab", "report", "blood", "test", "ultrasound", "scan", "doctor", "reports"] },
  { title: "Health Analytics & Weight Trends", desc: "Track weight progress and MVI index movement", category: "Analytics", path: "/analytics", keywords: ["analytics", "weight", "mvi", "chart", "graph", "trends", "progress"] },
  { title: "My Profile & Account Settings", desc: "Update personal details & account info", category: "Account", path: "/profile", keywords: ["profile", "account", "settings", "user", "name", "email"] },
];

function DashboardLayout({ children }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const displayName = user?.fullName || "PCOS Care User";

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = query.trim()
    ? searchIndex.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((kw) => kw.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelectResult = (path) => {
    setQuery("");
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-search-container" ref={searchContainerRef}>
            <div className="topbar-search">
              <FaSearch aria-hidden="true" />
              <input
                aria-label={t("search")}
                placeholder={t("search")}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
              />
            </div>

            {isOpen && query.trim().length > 0 && (
              <div className="search-results-dropdown">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleSelectResult(item.path)}
                    >
                      <div className="search-item-info">
                        <span className="search-item-title">{item.title}</span>
                        <span className="search-item-desc">{item.desc}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="search-item-badge">{item.category}</span>
                        <FaChevronRight className="text-muted small" style={{ fontSize: "10px" }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-muted small">
                    No matching health records or features found for "{query}".
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="topbar-actions">
            <LanguageSelector compact />
            <Link className="notification-button" to="/reminders" aria-label="View reminders"><FaBell /></Link>
            <Link className="user-chip" to="/profile">
              <span className="user-avatar">{displayName.charAt(0).toUpperCase()}</span>
              <span><strong>{displayName}</strong><small>{t("myProfile")}</small></span>
            </Link>
          </div>
        </header>
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
