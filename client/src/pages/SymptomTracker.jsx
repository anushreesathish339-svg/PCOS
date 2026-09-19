import DashboardLayout from "../layouts/DashboardLayout";
import SymptomForm from "../components/SymptomTracker";
import "./HealthPages.css";

function SymptomTracker() {
    return (
        <DashboardLayout>
            <section className="health-page">
                <header className="health-header">
                    <div>
                        <p className="health-kicker">Daily check-in</p>
                        <h1>Symptom Tracker</h1>
                        <p>Record how you feel and monitor changes over time.</p>
                    </div>
                </header>
                <SymptomForm />
            </section>
        </DashboardLayout>
    );
}

export default SymptomTracker;
