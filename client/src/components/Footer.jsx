import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>🌸 PCOS AI</h2>

          <p>
            Intelligent PCOS Management Platform
            powered by Artificial Intelligence.
          </p>
        </div>

        <div className="footer-section">

          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a>

        </div>

        <div className="footer-section">

          <h3>Features</h3>

          <p>AI Prediction</p>
          <p>Cycle Tracker</p>
          <p>Diet Plan</p>
          <p>Yoga Recommendation</p>

        </div>

        <div className="footer-section">

          <h3>Contact</h3>

          <p>Email</p>
          <p>support@pcosai.com</p>

          <p>Phone</p>
          <p>+91 9876543210</p>

        </div>

      </div>

      <hr />

      <div className="copyright">

        © 2026 Intelligent PCOS Management Platform.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;