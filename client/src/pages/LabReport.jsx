import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "./HealthPages.css";

const readReports = () => JSON.parse(localStorage.getItem("pcos-lab-reports") || "[]");

function LabReport() {
  const [reports, setReports] = useState(readReports);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    const next = [...reports, {
      id: crypto.randomUUID(), name, date, fileName: file.name, size: file.size,
    }];
    localStorage.setItem("pcos-lab-reports", JSON.stringify(next));
    setReports(next); setName(""); setDate(""); setFile(null);
    event.target.reset();
  };

  return (
    <DashboardLayout>
      <section className="health-page">
        <header className="health-header"><div><p className="health-kicker">Health records</p>
          <h1>Lab Reports</h1><p>Organize report details so they are easy to find later.</p></div></header>
        <div className="health-grid">
          <form className="health-card health-form" onSubmit={submit}>
            <h2>Add report</h2>
            <label>Report name<input required placeholder="e.g. Hormone panel" value={name}
              onChange={(e) => setName(e.target.value)} /></label>
            <label>Test date<input type="date" required value={date}
              onChange={(e) => setDate(e.target.value)} /></label>
            <label>Choose file<input type="file" accept=".pdf,.png,.jpg,.jpeg" required
              onChange={(e) => setFile(e.target.files[0])} /></label>
            <button type="submit">Add report</button>
          </form>
          <div className="health-card"><h2>Report history</h2>
            {reports.length ? reports.map((report) => (
              <article className="health-list-item" key={report.id}>
                <div><strong>{report.name}</strong><p>{report.date} · {report.fileName}</p></div>
                <button className="health-delete" onClick={() => {
                  const next = reports.filter((item) => item.id !== report.id);
                  localStorage.setItem("pcos-lab-reports", JSON.stringify(next)); setReports(next);
                }}>Remove</button>
              </article>
            )) : <p className="health-empty">No reports added yet.</p>}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default LabReport;
