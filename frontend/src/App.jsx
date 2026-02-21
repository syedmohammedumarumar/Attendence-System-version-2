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
        err.response?.data?.error || "Something went wrong. Please try again.";
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
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      {!attendanceData ? (
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      ) : (
        <>
          <button onClick={handleReset}>← Check Another Student</button>
          <AttendanceTable data={attendanceData} />
        </>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "10px" }}>
          ❌ Error: {error}
        </div>
      )}
    </div>
  );
}

export default App;
