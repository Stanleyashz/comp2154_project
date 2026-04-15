import { useEffect, useState } from "react";

const STATUSES = [
  "Applied",
  "Interview Scheduled",
  "Assessment",
  "Offer Received",
  "Rejected",
  "Withdrawn"
];

const emptyForm = {
  companyName: "",
  jobTitle: "",
  dateApplied: "",
  status: "Applied",
  jobUrl: "",
  notes: ""
};

export default function DashboardPage({ apiBaseUrl, token, user }) {
  const [applications, setApplications] = useState([]);
  const [summary, setSummary] = useState({ total: 0, byStatus: {} });
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function apiFetch(path, options = {}) {
    const res = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {})
      }
    });
    const payload = await res.json();
    return { ok: res.ok, payload };
  }

  async function loadData() {
    const params = new URLSearchParams();
    if (filterStatus) params.set("status", filterStatus);
    if (searchQuery) params.set("search", searchQuery);

    const [appsRes, summaryRes] = await Promise.all([
      apiFetch(`/api/applications?${params}`),
      apiFetch("/api/applications/summary")
    ]);

    if (appsRes.ok) setApplications(appsRes.payload.applications);
    if (summaryRes.ok) setSummary(summaryRes.payload);
  }

  useEffect(() => {
    loadData();
  }, [filterStatus, searchQuery]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const isEdit = editingId !== null;
    const response = await apiFetch(
      isEdit ? `/api/applications/${editingId}` : "/api/applications",
      { method: isEdit ? "PUT" : "POST", body: JSON.stringify(form) }
    );

    if (!response.ok) {
      setError(response.payload.error || "Could not save application");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    loadData();
  }

  function handleEdit(application) {
    setEditingId(application.id);
    setForm({
      companyName: application.companyName,
      jobTitle: application.jobTitle,
      dateApplied: application.dateApplied,
      status: application.status,
      jobUrl: application.jobUrl || "",
      notes: application.notes || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this application?")) return;
    const res = await apiFetch(`/api/applications/${id}`, { method: "DELETE" });
    if (res.ok) {
      loadData();
    }
  }

  return (
    <div className="dashboard">
      <section className="hero">
        <p className="eyebrow">Week 10 Build</p>
        <h2>Welcome, {user?.name}</h2>
        <p>Track your job applications and manage progress through your hiring pipeline.</p>
      </section>

      <section className="grid">
        {/* ── Add / Edit Form ── */}
        <article className="card">
          <h3>{editingId ? "Edit Application" : "Add Application"}</h3>
          <form className="stack" onSubmit={handleSubmit}>
            <input
              required
              value={form.companyName}
              placeholder="Company *"
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />
            <input
              required
              value={form.jobTitle}
              placeholder="Job title *"
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            />
            <input
              required
              value={form.dateApplied}
              type="date"
              onChange={(e) => setForm({ ...form, dateApplied: e.target.value })}
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              value={form.jobUrl}
              placeholder="Job URL (optional)"
              onChange={(e) => setForm({ ...form, jobUrl: e.target.value })}
            />
            <textarea
              value={form.notes}
              placeholder="Notes (optional)"
              rows="3"
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="submit" style={{ flex: 1 }}>
                {editingId ? "Update Application" : "Save Application"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={{ flex: 1, background: "#6c757d" }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
          {error && <p className="error">{error}</p>}
        </article>

        {/* ── Summary ── */}
        <article className="card">
          <h3>Summary</h3>
          <p className="summary-count">{summary.total} total applications</p>
          <ul className="summary-list">
            {Object.entries(summary.byStatus || {}).map(([status, count]) => (
              <li key={status}>
                <span>{status}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* ── Applications Table ── */}
      <section className="card">
        <h3>Tracked Applications</h3>

        {/* Filter / Search controls */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input
            style={{ flex: 1, minWidth: "160px" }}
            placeholder="Search company or role…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            style={{ flex: 1, minWidth: "160px" }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {(filterStatus || searchQuery) && (
            <button
              type="button"
              onClick={() => { setFilterStatus(""); setSearchQuery(""); }}
              style={{ background: "#6c757d" }}
            >
              Clear filters
            </button>
          )}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                    No applications found.
                  </td>
                </tr>
              )}
              {applications.map((application) => (
                <tr key={application.id} style={editingId === application.id ? { background: "#fffbe6" } : {}}>
                  <td>
                    {application.jobUrl ? (
                      <a href={application.jobUrl} target="_blank" rel="noreferrer">
                        {application.companyName}
                      </a>
                    ) : (
                      application.companyName
                    )}
                  </td>
                  <td>{application.jobTitle}</td>
                  <td>{application.status}</td>
                  <td>{application.dateApplied}</td>
                  <td>{application.notes || "-"}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(application)}
                      style={{ marginRight: "0.4rem", padding: "0.25rem 0.6rem", fontSize: "0.8rem" }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(application.id)}
                      style={{ padding: "0.25rem 0.6rem", fontSize: "0.8rem", background: "#e63946" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
