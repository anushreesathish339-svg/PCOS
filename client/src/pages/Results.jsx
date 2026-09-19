import DashboardLayout from "../layouts/DashboardLayout";
import ResultCard from "../components/ResultCard";

function Results() {
  return (
    <DashboardLayout>

      <h2 className="mb-4">
        Prediction Result
      </h2>

      <ResultCard />

    </DashboardLayout>
  );
}

export default Results;