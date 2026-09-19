import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await loginUser(formData);
      const { token, user } = response.data;
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to log in. Please check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-container">
      <section className="login-left" aria-label="Platform introduction">
        <div className="login-illustration" aria-hidden="true">✦</div>
        <h1>Welcome back</h1>
        <p>Sign in to continue your personalized PCOS health journey.</p>
      </section>

      <section className="login-right">
        <div className="login-card">
          <Link className="login-brand" to="/">PCOS Care</Link>
          <h2>Login to your account</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <label className="remember">
              <span>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                Remember me
              </span>
            </label>

            {error && <p className="login-error" role="alert">{error}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="login-register">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
