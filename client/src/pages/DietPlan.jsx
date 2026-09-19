import DashboardLayout from "../layouts/DashboardLayout";
import DietCard from "../components/DietCard";
import CalorieCounter from "../components/CalorieCounter";
import InsulinFoodGuide from "../components/InsulinFoodGuide";
import "./HealthPages.css";
import "./WellnessTools.css";

function DietPlan() {
  return (
    <DashboardLayout>

      <section className="health-page">
        <header className="health-header">
          <div><p className="health-kicker">Nutrition portfolio</p><h1>Diet & Calories</h1>
            <p>Plan balanced meals and estimate calories as you build your day.</p></div>
        </header>
        <div className="diet-tools">
          <DietCard />
          <CalorieCounter />
        </div>
        <InsulinFoodGuide />
      </section>

    </DashboardLayout>
  );
}

export default DietPlan;
