import DashboardLayout from "../layouts/DashboardLayout";
import YogaCard from "../components/YogaCard";

function YogaPlan() {
  return (
    <DashboardLayout>

      <h2 className="mb-4">
        Yoga Recommendation
      </h2>

      <YogaCard />

    </DashboardLayout>
  );
}

export default YogaPlan;