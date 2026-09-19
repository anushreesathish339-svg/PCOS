import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./HealthPages.css";

const readReminders = () => JSON.parse(localStorage.getItem("pcos-reminders") || "[]");

function Reminder() {
  const [reminders, setReminders] = useState(readReminders);
  const [form, setForm] = useState({ title: "", date: "", time: "", type: "Medication" });

  const save = (next) => {
    setReminders(next);
    localStorage.setItem("pcos-reminders", JSON.stringify(next));
  };

  const submit = (event) => {
    event.preventDefault();
    save([...reminders, { ...form, id: crypto.randomUUID() }]);
    setForm({ title: "", date: "", time: "", type: "Medication" });
  };

  return (
    <DashboardLayout>
      <section className="health-page">
        <header className="health-header"><div><p className="health-kicker">Stay on track</p>
          <h1>Reminders</h1><p>Schedule medicine, appointment, and wellness alerts.</p></div></header>
        <div className="health-grid">
          <form className="health-card health-form" onSubmit={submit}>
            <h2>Create reminder</h2>
            <label>Title<input required value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label>Type<select value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Medication</option><option>Appointment</option><option>Cycle</option><option>Wellness</option>
            </select></label>
            <label>Date<input type="date" required value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
            <label>Time<input type="time" required value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
            <button type="submit">Save reminder</button>
          </form>
          <div className="health-card"><h2>Upcoming</h2>
            {reminders.length ? reminders.map((item) => (
              <article className="health-list-item" key={item.id}>
                <div><strong>{item.title}</strong><p>{item.type} · {item.date} at {item.time}</p></div>
                <button className="health-delete" onClick={() => save(reminders.filter((r) => r.id !== item.id))}>Remove</button>
              </article>
            )) : <p className="health-empty">No reminders scheduled.</p>}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Reminder;
