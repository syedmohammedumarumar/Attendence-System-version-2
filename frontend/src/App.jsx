import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import AttendanceTable from "./components/AttendanceTable";
import { fetchAttendance } from "./api/attendanceApi";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);

  const handleSubmit = async (userId, password) => {
    setLoading(true);
    setError(null);
    setAttendanceData(null);

    try {
      const data = await fetchAttendance(userId, password);
      setAttendanceData(data);
    } catch (err) {
      const message =
        err.response?.data?.error || "Portal access failed. Please check your credentials and try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAttendanceData(null);
    setError(null);
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem 1rem",
      minHeight: "100vh",
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      position: 'relative'
    }}>
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      {!attendanceData ? (
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      ) : (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button onClick={handleReset} style={{
              width: 'auto',
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-muted)',
              fontSize: '0.875rem',
              padding: '0.5rem 1rem'
            }}>
              ← Logout / Check Another
            </button>
          </div>
          <AttendanceTable data={attendanceData} />
        </div>
      )}

      {error && (
        <div className="animate-fade-in" style={{
          padding: '1rem 1.5rem',
          background: 'rgba(225, 29, 72, 0.1)',
          border: '1px solid rgba(225, 29, 72, 0.2)',
          borderRadius: '1rem',
          color: 'var(--danger)',
          textAlign: 'center',
          maxWidth: '450px',
          margin: '0 auto',
          width: 'calc(100% - 2rem)'
        }}>
          ❌ {error}
        </div>
      )}

      <footer style={{
        marginTop: 'auto',
        padding: '2.5rem 0',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        borderTop: '1px solid var(--border)',
        width: '100%',
        zIndex: 1,
        position: 'relative'
      }}>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ textAlign: 'left' }}>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>
              Developed by <span style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>Syed Mohammed Umar</span>
            </p>
            <p style={{ margin: 0, opacity: 0.6 }}>Version 2.0 • Automated Attendance Calculator</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="https://www.linkedin.com/in/mohammedumar474" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <a href="https://smdumar.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>smdumar.in</a>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
