import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaChartLine, FaHeartbeat, FaUsers } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { getMemberCount } from "../services/dashboardService";
import "./Home.css";

const services = [
  { number: "01", title: "Know your patterns", text: "Track symptoms and cycles in one calm, organized personal space.", icon: FaHeartbeat },
  { number: "02", title: "Understand your health", text: "Turn daily records into useful predictions and visual trends.", icon: FaChartLine },
  { number: "03", title: "Build better routines", text: "Keep medication, nutrition, yoga, and reminders close at hand.", icon: FaCalendarAlt },
];

function Home() {
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    getMemberCount()
      .then(({ data }) => setMemberCount(data.count ?? data.totalUsers ?? data.data?.count ?? null))
      .catch(() => setMemberCount(null));
  }, []);

  return (
    <div className="portfolio-site">
      <Navbar />

      <main>
        <section className="portfolio-hero">
          <div className="hero-copy">
            <p className="portfolio-label">PERSONAL HEALTH, BEAUTIFULLY ORGANIZED</p>
            <h1>Your PCOS journey deserves a clearer <em>story.</em></h1>
            <p className="hero-summary">
              A thoughtful wellness companion that brings your symptoms, cycles,
              predictions, medication, and progress together.
            </p>
            <div className="hero-buttons">
              <Link to="/register" className="btn-primary">Start your journey <FaArrowRight /></Link>
              <Link to="/login" className="btn-secondary">I already have an account</Link>
            </div>
          </div>

          <aside className="hero-portfolio-card">
            <div className="portfolio-card-top">
              <span>Health Companion</span>
              <span className="status-dot">Active</span>
            </div>
            <div className="portfolio-monogram">PC</div>
            <h2>One place for your whole journey.</h2>
            <div className="mini-metrics">
              <div><strong>Daily</strong><span>Check-ins</span></div>
              <div><strong>Private</strong><span>Records</span></div>
              <div><strong>Clear</strong><span>Insights</span></div>
            </div>
          </aside>
        </section>

        <section className="portfolio-intro" id="about">
          <p className="portfolio-label">WHAT WE HELP YOU DO</p>
          <div className="intro-heading">
            <h2>A personal body of work—built around your wellbeing.</h2>
            <p>Simple tools, meaningful records, and a gentle visual experience designed to make consistent care feel achievable.</p>
          </div>
        </section>

        <section className="service-grid" id="features">
          {services.map(({ number, title, text, icon: Icon }) => (
            <article className="service-card" key={number}>
              <div className="service-meta"><span>{number}</span><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="community-showcase">
          <div className="community-copy">
            <p className="portfolio-label">A GROWING COMMUNITY</p>
            <h2>{memberCount ? memberCount.toLocaleString() : "1+"} members are building healthier patterns.</h2>
            <p>Your journey is personal, but you are not alone.</p>
          </div>
          <div className="community-orbit"><FaUsers /><span>PCOS<br />CARE</span></div>
        </section>

        <section className="portfolio-cta" id="contact">
          <p className="portfolio-label">YOUR NEXT CHAPTER</p>
          <h2>Start recording the story your health is already telling.</h2>
          <Link to="/register">Create your free account <FaArrowRight /></Link>
        </section>
      </main>

      <footer className="portfolio-footer">
        <strong>PCOS Care</strong>
        <span>Personal wellness, thoughtfully presented.</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

export default Home;
