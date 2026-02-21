import React, { useState } from "react";

function LoginForm({ onSubmit, loading }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userId, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>MITS IMS Automated Attendance System</h2>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your Student ID"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Fetching..." : "Check Attendance"}
      </button>
      <p style={{ fontSize: "12px", color: "gray" }}>
        ⚠️ Your credentials are not stored. They are only used to fetch your attendance.
      </p>
    </form>
  );
}

export default LoginForm;