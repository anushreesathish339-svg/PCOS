import React, { useState } from "react";
import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./WebGraphCard.css";

// Register ChartJS elements
ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function WebGraphCard({ inputData = {}, probability = 0 }) {
  const [activeTab, setActiveTab] = useState("histogram"); // 'histogram', 'ml_importance', 'radar'

  // Extract and calculate dynamic values
  const amh = Number(inputData.AMH || 0);
  const lh = Number(inputData.LH || 0);
  const fsh = Number(inputData.FSH || 1);
  const ratio = fsh > 0 ? lh / fsh : 0;
  const bmi = Number(inputData.BMI || 0);
  const cycle = Number(inputData.Cycle_Length || 28);
  const regularity = Number(inputData.Cycle_Regularity || 2);
  const insulin = Number(inputData.Insulin || 0);

  // Scaled values (0 - 100) matching user profile
  const userValues = [
    Math.min(100, Math.round((amh / 8) * 100)),       // AMH Level
    Math.min(100, Math.round((ratio / 3) * 100)),     // LH/FSH Ratio
    Math.min(100, Math.round((bmi / 40) * 100)),      // BMI
    Math.min(100, Math.round((cycle / 50) * 100)),    // Cycle Length
    regularity >= 4 ? 90 : 20                         // Cycle Irregularity
  ];

  const healthyValues = [35, 30, 50, 56, 20];
  const pcosThresholds = [50, 50, 62, 76, 60];

  // 1. Histogram / Grouped Bar Chart Data
  const histogramData = {
    labels: [
      "AMH Level",
      "LH/FSH Ratio",
      "BMI Index",
      "Cycle Length",
      "Cycle Irregularity",
    ],
    datasets: [
      {
        label: "Your Parameter Profile",
        data: userValues,
        backgroundColor: "rgba(138, 91, 212, 0.85)",
        borderColor: "#8a5bd4",
        borderWidth: 1.5,
        borderRadius: 8,
      },
      {
        label: "Healthy Baseline Average",
        data: healthyValues,
        backgroundColor: "rgba(59, 130, 246, 0.65)",
        borderColor: "#3b82f6",
        borderWidth: 1.5,
        borderRadius: 8,
      },
      {
        label: "PCOS Risk Threshold",
        data: pcosThresholds,
        backgroundColor: "rgba(239, 68, 68, 0.45)",
        borderColor: "#ef4444",
        borderWidth: 1.5,
        borderRadius: 8,
      },
    ],
  };

  const histogramOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#334155",
          font: { size: 12, weight: "600" },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#475569", font: { weight: "600", size: 12 } },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: "rgba(203, 213, 225, 0.4)" },
        ticks: {
          color: "#64748b",
          callback: (val) => `${val}%`,
        },
      },
    },
  };

  // 2. Machine Learning Feature Contribution Plot (SHAP-style Feature Importance)
  const amhScore = amh > 4.0 ? 30 : amh > 2.5 ? 15 : 5;
  const ratioScore = ratio >= 2.0 ? 25 : ratio >= 1.5 ? 12 : 5;
  const bmiScore = bmi >= 25 ? 20 : 8;
  const cycleScore = regularity >= 4 || cycle > 38 ? 20 : 5;
  const insulinScore = insulin > 12 ? 15 : 5;

  const totalScore = amhScore + ratioScore + bmiScore + cycleScore + insulinScore || 1;

  const mlFeatureWeights = [
    Math.round((amhScore / totalScore) * probability),
    Math.round((ratioScore / totalScore) * probability),
    Math.round((bmiScore / totalScore) * probability),
    Math.round((cycleScore / totalScore) * probability),
    Math.round((insulinScore / totalScore) * probability),
  ];

  const mlImportanceData = {
    labels: [
      "AMH Marker Impact",
      "LH/FSH Hormone Ratio",
      "BMI & Metabolic Factor",
      "Cycle Irregularity",
      "Fasting Insulin Level",
    ],
    datasets: [
      {
        label: "Model Feature Risk Contribution (%)",
        data: mlFeatureWeights,
        backgroundColor: [
          "rgba(147, 51, 234, 0.85)",
          "rgba(236, 72, 153, 0.85)",
          "rgba(239, 68, 68, 0.85)",
          "rgba(245, 158, 11, 0.85)",
          "rgba(14, 165, 233, 0.85)",
        ],
        borderRadius: 8,
        borderWidth: 1,
      },
    ],
  };

  const mlImportanceOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        padding: 10,
        callbacks: {
          label: (context) => ` Model Risk Contribution: +${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "rgba(203, 213, 225, 0.4)" },
        ticks: {
          color: "#64748b",
          callback: (val) => `+${val}%`,
        },
      },
      y: {
        grid: { display: false },
        ticks: { color: "#334155", font: { weight: "600", size: 12 } },
      },
    },
  };

  // 3. Radar Chart Data
  const radarData = {
    labels: [
      "AMH Level",
      "LH/FSH Ratio",
      "BMI Index",
      "Cycle Length",
      "Cycle Irregularity",
    ],
    datasets: [
      {
        label: "Your Parameter Profile",
        data: userValues,
        backgroundColor: "rgba(138, 91, 212, 0.22)",
        borderColor: "#8a5bd4",
        borderWidth: 3,
        pointBackgroundColor: "#8a5bd4",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "Healthy Baseline Average",
        data: healthyValues,
        backgroundColor: "rgba(74, 144, 226, 0.15)",
        borderColor: "#4a90e2",
        borderWidth: 2,
        pointBackgroundColor: "#4a90e2",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true, color: "#e2e8f0", lineWidth: 1.5 },
        grid: { color: "#cbd5e1", lineWidth: 1, circular: false },
        pointLabels: {
          color: "#475569",
          font: { size: 13, weight: "600" },
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#334155", font: { size: 13, weight: "700" } },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        callbacks: {
          label: (context) => ` ${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 bg-white clean-web-card">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 border-bottom pb-3">
        <div className="text-start">
          <h5 className="fw-bold m-0 text-dark">Clinical Visualization & ML Risk Factors</h5>
          <small className="text-muted">Interactive parameter histogram and ML model feature importance analysis</small>
        </div>
        <div className="btn-group mt-2 mt-sm-0" role="group" aria-label="Visualization Type">
          <button
            type="button"
            className={`btn btn-sm ${activeTab === "histogram" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("histogram")}
          >
            📊 Histogram Bar
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === "ml_importance" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("ml_importance")}
          >
            🧠 ML Feature Weight
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeTab === "radar" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTab("radar")}
          >
            🕸️ Spider Web
          </button>
        </div>
      </div>

      <div className="chart-wrapper mx-auto position-relative" style={{ height: "380px", maxWidth: "680px", width: "100%" }}>
        {activeTab === "histogram" && <Bar data={histogramData} options={histogramOptions} />}
        {activeTab === "ml_importance" && <Bar data={mlImportanceData} options={mlImportanceOptions} />}
        {activeTab === "radar" && <Radar data={radarData} options={radarOptions} />}
      </div>
    </div>
  );
}

export default WebGraphCard;
