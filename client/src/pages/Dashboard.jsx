import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaChartLine, FaHeartbeat, FaPlus, FaRobot, FaStethoscope, FaUsers } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboard, getMemberCount } from "../services/dashboardService";
import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    Promise.allSettled([getDashboard(), getMemberCount()]).then(([dashboardResult, membersResult]) => {
      const dashboardData = dashboardResult.status === "fulfilled"
        ? dashboardResult.value.data.dashboard || {}
        : {};
      const countData = membersResult.status === "fulfilled" ? membersResult.value.data : {};
      setDashboard(dashboardData);
      setMemberCount(
        dashboardData.totalUsers ??
        dashboardData.totalMembers ??
        countData.count ??
        countData.totalUsers ??
        countData.data?.count ??
        null
      );
    }).finally(() => setIsLoading(false));
  }, []);

  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const firstName = user?.fullName?.split(" ")[0] || "there";
  const stats = [
    { label: "Predictions", value: dashboard.totalPredictions, icon: FaRobot, tone: "purple" },
    { label: "Cycles tracked", value: dashboard.totalCycles, icon: FaCalendarAlt, tone: "pink" },
    { label: "Symptom logs", value: dashboard.totalSymptoms, icon: FaHeartbeat, tone: "blue" },
    { label: "Health score", value: dashboard.healthScore, suffix: "%", icon: FaChartLine, tone: "green" },
  ];

  return (
    <DashboardLayout>
      <section className="dashboard-page">
        <div className="portfolio-dashboard-hero">
          <div>
            <p className="eyebrow">MY HEALTH PORTFOLIO</p>
            <h1>Hello, {firstName}.</h1>
            <p>A living record of your routines, patterns, and progress.</p>
          </div>
          <Link className="primary-action" to="/prediction"><FaPlus /> New prediction</Link>
          <span className="hero-index">01 / OVERVIEW</span>
        </div>

        <div className="community-banner">
          <span className="community-icon"><FaUsers /></span>
          <div>
            <strong>{memberCount ? memberCount.toLocaleString() : "1+"} members</strong>
            <p>are using PCOS Care to understand and support their wellness journey.</p>
          </div>
        </div>

        <div className="section-title-row">
          <div><p className="eyebrow">SELECTED METRICS</p><h2>Your progress at a glance</h2></div>
          <span>Updated from your records</span>
        </div>
        <div className="dashboard-cards">
          {stats.map(({ label, value, suffix = "", icon: Icon, tone }, index) => (
            <article className={`dashboard-card ${tone}`} key={label}>
              <span className="card-index">0{index + 1}</span>
              <div className="stat-icon"><Icon /></div>
              <div><p>{label}</p><strong>{isLoading ? "—" : `${value ?? 0}${suffix}`}</strong></div>
            </article>
          ))}
        </div>

        <div className="dashboard-columns">
          <section className="dashboard-panel journey-panel">
            <div className="panel-heading"><div><p className="eyebrow">CURRENT PROJECTS</p><h2>Continue your journey</h2></div></div>
            <div className="journey-list">
              <Link to="/symptoms"><span className="journey-icon symptoms"><FaHeartbeat /></span><span><strong>Log today’s symptoms</strong><small>Build a clearer health pattern</small></span><FaArrowRight /></Link>
              <Link to="/cycle"><span className="journey-icon cycle"><FaCalendarAlt /></span><span><strong>Update cycle tracker</strong><small>Keep your calendar accurate</small></span><FaArrowRight /></Link>
              <Link to="/labreports"><span className="journey-icon reports"><FaStethoscope /></span><span><strong>Add a lab report</strong><small>Keep important records together</small></span><FaArrowRight /></Link>
            </div>
          </section>
          <aside className="dashboard-panel wellness-panel">
            <div className="wellness-art"><FaHeartbeat /></div>
            <p className="eyebrow">FEATURED NOTE</p>
            <h2>Small check-ins create meaningful insights.</h2>
            <p>Record symptoms consistently so your trends become easier to understand.</p>
            <Link to="/symptoms">Check in now <FaArrowRight /></Link>
          </aside>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
