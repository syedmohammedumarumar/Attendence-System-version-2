import React from "react";

function AttendanceTable({ data }) {
  const { subjects, summary } = data;

  return (
    <div>
      <h3>Attendance Results</h3>

      {/* Summary */}
      <div>
        <p>Total Subjects: {summary.total_subjects}</p>
        <p>Total Attended: {summary.total_attended}</p>
        <p>Total Classes: {summary.total_classes}</p>
        <p>
          Overall Attendance:{" "}
          <strong
            style={{ color: summary.overall_percentage >= 75 ? "green" : "red" }}
          >
            {summary.overall_percentage}%
          </strong>
        </p>
        {summary.overall_percentage < 75 && (
          <p style={{ color: "red" }}>
            ⚠️ Your attendance is below 75%. Risk of shortage!
          </p>
        )}
      </div>

      {/* Subject Table */}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Attended</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{row.subject}</td>
              <td>{row.attended}</td>
              <td>{row.total}</td>
              <td>{row.percentage}%</td>
              <td style={{ color: row.percentage >= 75 ? "green" : "red" }}>
                {row.percentage >= 75 ? "✅ Safe" : "❌ Low"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Classes needed calculator */}
      <ClassesNeeded subjects={subjects} />
    </div>
  );
}

// Bonus: Calculate how many classes needed to reach 75%
function ClassesNeeded({ subjects }) {
  const lowSubjects = subjects.filter((s) => s.percentage < 75);
  if (lowSubjects.length === 0) return null;

  return (
    <div>
      <h4>Classes needed to reach 75%:</h4>
      <ul>
        {lowSubjects.map((s, idx) => {
          // Solve: (attended + x) / (total + x) = 0.75
          let x = 0;
          while (x < 200) {
            if ((s.attended + x) / (s.total + x) >= 0.75) break;
            x++;
          }
          return (
            <li key={idx}>
              {s.subject}: Need <strong>{x}</strong> more consecutive classes
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AttendanceTable;