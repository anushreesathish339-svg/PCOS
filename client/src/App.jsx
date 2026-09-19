import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import Results from "./pages/Results";
import CycleTrackerPage from "./pages/CycleTrackerPage";
import SymptomTracker from "./pages/SymptomTracker";
import Medication from "./pages/Medication";
import Reminder from "./pages/Reminder";
import DietPlan from "./pages/DietPlan";
import YogaPlan from "./pages/YogaPlan";
import LabReport from "./pages/LabReport";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { LanguageProvider } from "./context/LanguageContext";
import RiskGuidance from "./pages/RiskGuidance";
import PredictionDetails from "./pages/PredictionDetails";

function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/results" element={<Results />} />
        <Route path="/risk-guidance" element={<Navigate to="/prediction-analysis" replace />} />
        <Route path="/prediction-analysis" element={<PredictionDetails />} />
        <Route path="/cycle" element={<CycleTrackerPage />} />
        <Route path="/symptoms" element={<SymptomTracker />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/reminders" element={<Reminder />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/yoga" element={<YogaPlan />} />
        <Route path="/labreports" element={<LabReport />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
