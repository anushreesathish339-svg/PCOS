import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import PredictionForm from "../components/PredictionForm";

function Prediction() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  useEffect(() => {
    const stored = localStorage.getItem("prediction");
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const currentUserId = currentUser?._id || currentUser?.id;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const predictionUserId = parsed.inputData?.userId || parsed.userId;
        if (predictionUserId && currentUserId && predictionUserId === currentUserId) {
          if (!isNew) {
            navigate("/results");
          }
        } else {
          localStorage.removeItem("prediction");
        }
      } catch (e) {
        localStorage.removeItem("prediction");
      }
    }
  }, [navigate, isNew]);

  return (
    <DashboardLayout>

      <h2 className="mb-4">
        PCOS Prediction
      </h2>

      <div className="card shadow border-0 p-4">

        <PredictionForm />

      </div>

    </DashboardLayout>
  );
}

export default Prediction;