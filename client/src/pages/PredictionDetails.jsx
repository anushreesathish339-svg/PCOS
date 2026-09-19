import { Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaHeartbeat } from "react-icons/fa";
import DashboardLayout from "../layouts/DashboardLayout";
import "./PredictionDetails.css";

function PredictionDetails() {
  const storedPrediction = localStorage.getItem("prediction");
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUserId = currentUser?._id || currentUser?.id;

  let result = null;
  try {
    if (storedPrediction) {
      const parsed = JSON.parse(storedPrediction);
      const predictionUserId = parsed.inputData?.userId || parsed.userId;
      if (predictionUserId && currentUserId && predictionUserId === currentUserId) {
        result = parsed;
      } else {
        localStorage.removeItem("prediction");
      }
    }
  } catch {
    result = null;
  }

  if (!result) {
    return (
      <DashboardLayout>
        <div className="prediction-analysis-page">
          <div className="card shadow border-0 p-5 text-center">
            <FaHeartbeat className="text-muted mb-3" style={{ fontSize: "64px" }} />
            <h3>No Prediction Found</h3>
            <p className="text-muted mb-4">
              Please complete a PCOS screening first to view a detailed breakdown of your clinical parameters.
            </p>
            <div>
              <Link to="/prediction" className="btn btn-primary px-4 py-2">
                Start Screening
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const rawProbability = Number(result.probability);
  const probability = Number.isFinite(rawProbability)
    ? Math.round(rawProbability <= 1 ? rawProbability * 100 : rawProbability)
    : 0;

  const getRiskTone = (prob) => {
    if (prob >= 70) return "high";
    if (prob >= 40) return "medium";
    return "low";
  };

  const getRiskLabel = (prob) => {
    if (prob >= 70) return "High Risk Detected";
    if (prob >= 40) return "Moderate Risk Detected";
    return "Low Risk Detected";
  };

  const tone = getRiskTone(probability);

  // Parameter analysis configurations
  const age = Number(result.inputData?.Age);
  const weight = Number(result.inputData?.Weight);
  const height = Number(result.inputData?.Height);
  const bmi = Number(result.inputData?.BMI);
  const cycleLength = Number(result.inputData?.Cycle_Length);
  const lh = Number(result.inputData?.LH);
  const fsh = Number(result.inputData?.FSH);
  const amh = Number(result.inputData?.AMH);
  const cycleRegularity = Number(result.inputData?.Cycle_Regularity);
  const weightGain = Number(result.inputData?.Weight_Gain);
  const hairLoss = Number(result.inputData?.Hair_Loss);
  const acne = Number(result.inputData?.Acne);

  // LH/FSH ratio
  const lhFshRatio = fsh > 0 ? (lh / fsh).toFixed(2) : "N/A";

  const getBmiStatus = (val) => {
    if (!val) return { label: "N/A", class: "warning" };
    if (val >= 18.5 && val <= 24.9) return { label: "Healthy Range", class: "success" };
    if (val >= 25 && val <= 29.9) return { label: "Overweight", class: "warning" };
    return { label: "Obese / Underweight", class: "danger" };
  };

  const getLhFshStatus = (val) => {
    if (val === "N/A") return { label: "N/A", class: "warning" };
    const ratio = Number(val);
    if (ratio >= 2.0) return { label: "High Ratio (LH Dominant)", class: "danger" };
    if (ratio >= 1.5) return { label: "Borderline Ratio", class: "warning" };
    return { label: "Normal Ratio", class: "success" };
  };

  const getAmhStatus = (val) => {
    if (!val) return { label: "N/A", class: "warning" };
    if (val >= 1.5 && val <= 4.0) return { label: "Normal AMH", class: "success" };
    if (val > 4.0) return { label: "High AMH (Polycystic Indicator)", class: "danger" };
    return { label: "Low AMH", class: "warning" };
  };

  const getCycleStatus = (length, reg) => {
    if (reg >= 4) return { label: "Irregular Cycle", class: "danger" };
    if (length < 24 || length > 38) return { label: "Irregular Length", class: "warning" };
    return { label: "Regular Cycles", class: "success" };
  };

  const getSymptomStatus = (val) => {
    return val === 1 ? { label: "Present", class: "danger" } : { label: "Absent", class: "success" };
  };

  return (
    <DashboardLayout>
      <div className="prediction-analysis-page">
        <div className="mb-2">
          <Link to="/results" className="text-muted text-decoration-none">
            <FaArrowLeft className="me-2" /> Back to screening summary
          </Link>
        </div>

        <section className="analysis-hero-card">
          <p className="eyebrow m-0 text-uppercase">Diagnostic Parameter Breakdown</p>
          <h2 className="mt-1">Prediction Analysis</h2>
          <p className="text-muted m-0 mb-3">
            A granular medical-based analysis of the clinical markers you entered. Learn how each value influences your screening probability.
          </p>
          


          <div className="analysis-status-row">
            <span className={`analysis-badge ${tone}`}>{getRiskLabel(probability)}</span>
            <span className="analysis-probability">Computed Risk Probability: {probability}%</span>
          </div>
        </section>



        <div className="analysis-grid">
          <div className="analysis-main-panel">
            {/* 1. Cycle Regularity & Length */}
            <div className="parameter-card">
              <div className="parameter-card-header">
                <div className="parameter-title-group">
                  <small>Menstrual Health</small>
                  <h3>Cycle Length & Regularity</h3>
                </div>
                <span className={`parameter-status-pill ${getCycleStatus(cycleLength, cycleRegularity).class}`}>
                  {getCycleStatus(cycleLength, cycleRegularity).label}
                </span>
              </div>
              <div className="parameter-comparison-row">
                <div className="comparison-box">
                  <span>Your Cycle Details</span>
                  <strong>{cycleLength ? `${cycleLength} days` : "-"}</strong>
                  <small className="d-block text-muted mt-1">{cycleRegularity >= 4 ? "Irregular cycles" : "Regular cycles"}</small>
                </div>
                <div className="comparison-box">
                  <span>Healthy Standard</span>
                  <strong>24 - 38 days</strong>
                  <small className="d-block text-muted mt-1">Regular intervals</small>
                </div>
              </div>
              <p className="parameter-explanation">
                Irregular cycles (oligomenorrhea) or cycles longer than 38 days suggest that ovulation is infrequent or absent (anovulation). Infrequent ovulation is a core diagnostic pillar of PCOS.
              </p>
            </div>

            {/* 2. AMH */}
            <div className="parameter-card">
              <div className="parameter-card-header">
                <div className="parameter-title-group">
                  <small>Ovarian Reserve Hormone</small>
                  <h3>Anti-Müllerian Hormone (AMH)</h3>
                </div>
                <span className={`parameter-status-pill ${getAmhStatus(amh).class}`}>
                  {getAmhStatus(amh).label}
                </span>
              </div>
              <div className="parameter-comparison-row">
                <div className="comparison-box">
                  <span>Your AMH Reserve</span>
                  <strong>{amh ? `${amh} ng/mL` : "-"}</strong>
                </div>
                <div className="comparison-box">
                  <span>Healthy Reserve</span>
                  <strong>1.5 - 4.0 ng/mL</strong>
                </div>
              </div>
              <p className="parameter-explanation">
                AMH levels indicate the quantity of small growing follicles in the ovaries. Elevated AMH (above 4.0 ng/mL) is strongly correlated with a high count of immature, cystic follicles, which is characteristic of polycystic ovarian morphology.
              </p>
            </div>

            {/* 3. LH/FSH Ratio */}
            <div className="parameter-card">
              <div className="parameter-card-header">
                <div className="parameter-title-group">
                  <small>Gonadotropins Ratio</small>
                  <h3>LH / FSH Ratio</h3>
                </div>
                <span className={`parameter-status-pill ${getLhFshStatus(lhFshRatio).class}`}>
                  {getLhFshStatus(lhFshRatio).label}
                </span>
              </div>
              <div className="parameter-comparison-row">
                <div className="comparison-box">
                  <span>Your Ratio (LH/FSH)</span>
                  <strong>{lhFshRatio}</strong>
                  <small className="d-block text-muted mt-1">LH: {lh} · FSH: {fsh}</small>
                </div>
                <div className="comparison-box">
                  <span>Healthy Ratio</span>
                  <strong>~ 1.0</strong>
                  <small className="d-block text-muted mt-1">Balanced LH and FSH</small>
                </div>
              </div>
              <p className="parameter-explanation">
                In healthy women, Luteinizing Hormone (LH) and Follicle Stimulating Hormone (FSH) rise and fall in a balanced ratio. An elevated LH/FSH ratio (2.0 or higher) is a classic PCOS marker indicating that the pituitary gland is producing excess LH, stimulating androgen production and disrupting follicular development.
              </p>
            </div>

            {/* 4. BMI */}
            <div className="parameter-card">
              <div className="parameter-card-header">
                <div className="parameter-title-group">
                  <small>Metabolic Index</small>
                  <h3>Body Mass Index (BMI)</h3>
                </div>
                <span className={`parameter-status-pill ${getBmiStatus(bmi).class}`}>
                  {getBmiStatus(bmi).label}
                </span>
              </div>
              <div className="parameter-comparison-row">
                <div className="comparison-box">
                  <span>Your BMI</span>
                  <strong>{bmi ? bmi.toFixed(2) : "-"}</strong>
                  <small className="d-block text-muted mt-1">Weight: {weight}kg · Height: {height}cm</small>
                </div>
                <div className="comparison-box">
                  <span>Normal BMI Range</span>
                  <strong>18.5 - 24.9</strong>
                  <small className="d-block text-muted mt-1">Balanced body weight</small>
                </div>
              </div>
              <p className="parameter-explanation">
                A higher BMI is closely tied to insulin resistance. When cells become resistant to insulin, the pancreas produces more insulin. High blood insulin levels stimulate the ovaries to produce excess testosterone, worsening PCOS symptoms.
              </p>
            </div>

            {/* 5. Physical Symptoms */}
            <div className="parameter-card">
              <div className="parameter-card-header">
                <div className="parameter-title-group">
                  <small>Hyperandrogenic Indicators</small>
                  <h3>Androgenic Physical Symptoms</h3>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-sm-4">
                  <div className="comparison-box text-center">
                    <span>Acne / Pimples</span>
                    <strong className="d-block mt-2">{acne === 1 ? "Present" : "Absent"}</strong>
                    <span className={`badge mt-2 ${acne === 1 ? "bg-danger" : "bg-success"}`}>
                      {acne === 1 ? "Attention" : "Healthy"}
                    </span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="comparison-box text-center">
                    <span>Hair Loss / thinning</span>
                    <strong className="d-block mt-2">{hairLoss === 1 ? "Present" : "Absent"}</strong>
                    <span className={`badge mt-2 ${hairLoss === 1 ? "bg-danger" : "bg-success"}`}>
                      {hairLoss === 1 ? "Attention" : "Healthy"}
                    </span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="comparison-box text-center">
                    <span>Weight Gain (unexplained)</span>
                    <strong className="d-block mt-2">{weightGain === 1 ? "Present" : "Absent"}</strong>
                    <span className={`badge mt-2 ${weightGain === 1 ? "bg-danger" : "bg-success"}`}>
                      {weightGain === 1 ? "Attention" : "Healthy"}
                    </span>
                  </div>
                </div>
              </div>
              <p className="parameter-explanation mt-3">
                Physical indicators like persistent acne and male-pattern hair loss (androgenic alopecia) indicate excess circulation of male hormones (androgens) in the blood. Unexplained weight gain is usually a clinical indicator of secondary metabolic dysfunction.
              </p>
            </div>
          </div>

          <div className="analysis-sidebar">
            <div className="sidebar-card">
              <h3>Diagnostic Guidelines</h3>
              <p className="text-muted small">
                Clinicians worldwide use the Rotterdam Criteria to diagnose PCOS. A patient must meet at least two of these criteria:
              </p>
              <ul className="sidebar-bullet-list">
                <li>Irregular or absent ovulation (oligomenorrhea or anovulation).</li>
                <li>Clinical or biochemical excess of male hormones (androgens).</li>
                <li>Polycystic ovaries visible on an ultrasound scan.</li>
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Next Steps Checklist</h3>
              <ul className="sidebar-bullet-list">
                <li>Schedule a consultation with a healthcare professional or gynecologist.</li>
                <li>Take a copy of your screening parameters to your appointment.</li>
                <li>Request blood panels for LH, FSH, AMH, and Fasting Insulin to verify biochemical markers.</li>
                <li>Request a pelvic ultrasound to verify ovarian follicle distributions.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PredictionDetails;
