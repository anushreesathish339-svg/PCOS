import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaHeartbeat, FaLeaf, FaUserMd } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import "./WellnessTools.css";

const guidance = {
  high: {
    label: "High risk", range: "70–100%", tone: "high",
    summary: "Your result suggests stronger PCOS-related patterns. This is a screening result, not a diagnosis.",
    priorities: [
      "Book an appointment with a gynecologist or endocrinologist.",
      "Track cycles, symptoms, sleep, and medication consistently.",
      "Aim for gradual, sustainable changes rather than rapid weight loss.",
      "Ask your clinician whether glucose, thyroid, lipid, and hormone tests are appropriate.",
    ],
    foods: ["Non-starchy vegetables", "Dal, beans, eggs, fish or lean protein", "Whole grains in measured portions", "Nuts and seeds", "Low-sugar fruit"],
  },
  medium: {
    label: "Moderate risk", range: "40–69%", tone: "medium",
    summary: "Some patterns may benefit from closer tracking and preventive lifestyle support.",
    priorities: [
      "Review persistent or worsening symptoms with a clinician.",
      "Build toward 150 minutes of moderate activity each week.",
      "Keep meals regular and pair carbohydrates with protein and fibre.",
      "Review your trend after several weeks of consistent tracking.",
    ],
    foods: ["Vegetable-rich meals", "Whole grains", "Curd or unsweetened yogurt", "Lean protein", "Fruit with nuts"],
  },
  low: {
    label: "Low risk", range: "0–39%", tone: "low",
    summary: "Your current screening result shows fewer PCOS-related patterns. Continue supportive routines and monitoring.",
    priorities: [
      "Maintain regular movement, sleep, and balanced meals.",
      "Continue cycle and symptom check-ins.",
      "Avoid restrictive diets; focus on consistency and variety.",
      "Seek medical advice if symptoms change or concern you.",
    ],
    foods: ["Colourful vegetables", "Whole grains", "Protein at each meal", "Fruit", "Healthy fats"],
  },
};

function RiskGuidance() {
  const result = JSON.parse(localStorage.getItem("prediction") || "null");
  const rawProbability = Number(result?.probability);
  const probability = Number.isFinite(rawProbability)
    ? Math.round(rawProbability <= 1 ? rawProbability * 100 : rawProbability)
    : null;
  const level = probability == null ? null : probability >= 70 ? "high" : probability >= 40 ? "medium" : "low";
  const plan = level ? guidance[level] : null;

  return (
    <DashboardLayout>
      <section className="health-page risk-guide-page">
        <header className="health-header">
          <div><p className="health-kicker">Personal action plan</p><h1>Prediction & Risk Guidance</h1>
            <p>Understand your latest result and turn it into practical next steps.</p></div>
        </header>

        {!plan ? (
          <div className="health-card empty-guidance">
            <FaHeartbeat /><h2>No prediction found</h2>
            <p>Complete a prediction first to receive guidance matched to your result.</p>
            <Link to="/prediction">Start prediction <FaArrowRight /></Link>
          </div>
        ) : (
          <>
            <section className={`risk-summary ${plan.tone}`}>
              <div>
                <p>YOUR LATEST SCREENING</p>
                <h2>{plan.label}</h2>
                <span>{result?.prediction || "PCOS screening"} · {probability}% probability</span>
              </div>
              <div className="risk-scale" aria-label={`Risk probability ${probability}%`}>
                <span style={{ width: `${Math.min(100, Math.max(0, probability))}%` }} />
              </div>
              <p>{plan.summary}</p>
            </section>

            <div className="guidance-grid">
              <section className="health-card guidance-card">
                <div className="guidance-icon"><FaCheckCircle /></div>
                <p className="health-kicker">NEXT STEPS</p><h2>How to move toward lower risk</h2>
                <ol>{plan.priorities.map((item) => <li key={item}>{item}</li>)}</ol>
              </section>
              <section className="health-card guidance-card">
                <div className="guidance-icon food"><FaLeaf /></div>
                <p className="health-kicker">FOOD FOUNDATION</p><h2>Build meals around</h2>
                <ul className="food-foundation">{plan.foods.map((item) => <li key={item}>{item}</li>)}</ul>
                <Link to="/diet">Open calorie counter <FaArrowRight /></Link>
              </section>
            </div>

            <aside className="medical-note">
              <FaUserMd /><p><strong>Important:</strong> This page offers general wellness guidance and cannot diagnose PCOS or replace care from a qualified clinician.</p>
            </aside>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default RiskGuidance;
