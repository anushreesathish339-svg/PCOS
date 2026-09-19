import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import API from "../services/api";
import "./HealthPages.css";

const getToday = () => new Date().toLocaleDateString("en-CA");

function Medication() {
  const [medications, setMedications] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    medicineName: "", dosage: "", frequency: "", reminderTime: "",
    startDate: getToday(),
  });

  const loadMedications = async () => {
    try {
      const response = await API.get("/medications");
      setMedications(response.data.data || response.data.medications || []);
    } catch {
      setMessage("Could not load medications.");
    }
  };

  useEffect(() => {
    API.get("/medications")
      .then((response) => {
        setMedications(response.data.data || response.data.medications || []);
      })
      .catch(() => {
        setMessage("Could not load medications.");
      });
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      const storedUser =
        localStorage.getItem("user") || sessionStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const userId = user?._id || user?.id;

      if (!userId) {
        setMessage("Your session is missing user details. Please sign in again.");
        return;
      }

      await API.post("/medications", { ...form, userId });
      setForm({
        medicineName: "", dosage: "", frequency: "", reminderTime: "",
        startDate: getToday(),
      });
      setMessage("Medication added successfully.");
      await loadMedications();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add medication.");
    }
  };

  return (
    <DashboardLayout>
      <section className="health-page">
        <header className="health-header">
          <div><p className="health-kicker">Treatment plan</p><h1>Medication</h1>
            <p>Keep your medicines and dosage schedule in one place.</p></div>
        </header>
        <div className="health-grid">
          <form className="health-card health-form" onSubmit={submit}>
            <h2>Add medication</h2>
            <label>Medicine name<input required value={form.medicineName}
              onChange={(e) => setForm({ ...form, medicineName: e.target.value })} /></label>
            <label>Dosage<input required placeholder="e.g. 500 mg" value={form.dosage}
              onChange={(e) => setForm({ ...form, dosage: e.target.value })} /></label>
            <label>Frequency<select required value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}>
              <option value="">Select frequency</option><option>Once daily</option>
              <option>Twice daily</option><option>Three times daily</option>
              <option>As needed</option></select></label>
            <label>Reminder time<input type="time" required value={form.reminderTime}
              onChange={(e) => setForm({ ...form, reminderTime: e.target.value })} /></label>
            <label>Start date<input type="date" required value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></label>
            <button type="submit">Add medication</button>
            {message && <p className="health-message">{message}</p>}
          </form>
          <div className="health-card">
            <h2>Your schedule</h2>
            {medications.length ? medications.map((item) => (
              <article className="health-list-item" key={item._id || `${item.medicineName}-${item.reminderTime}`}>
                <div><strong>{item.medicineName}</strong><p>{item.dosage} · {item.frequency}</p></div>
                <time>{item.reminderTime}</time>
              </article>
            )) : <p className="health-empty">No medication added yet.</p>}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Medication;
