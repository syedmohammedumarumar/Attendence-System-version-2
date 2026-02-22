import React, { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Percent, BookOpen, Layers, Info } from 'lucide-react';

function AttendanceTable({ data }) {
  const { subjects: initialSubjects, summary: initialSummary } = data;
  const [excludeTT, setExcludeTT] = useState(false);

  const { filteredSubjects, filteredSummary } = useMemo(() => {
    let subjects = initialSubjects;
    if (excludeTT) {
      subjects = initialSubjects.filter(s =>
        !s.subject.toLowerCase().includes("technical training") &&
        !s.subject.toLowerCase().includes("tt")
      );
    }

    const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
    const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
    const overallPercentage = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(2) : 0;

    return {
      filteredSubjects: subjects,
      filteredSummary: {
        ...initialSummary,
        total_subjects: subjects.length,
        total_attended: totalAttended,
        total_classes: totalClasses,
        overall_percentage: overallPercentage
      }
    };
  }, [initialSubjects, initialSummary, excludeTT]);

  const chartData = filteredSubjects.map(s => ({
    name: s.subject.length > 20 ? s.subject.substring(0, 20) + "..." : s.subject,
    percentage: s.percentage,
    full_name: s.subject
  }));

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem', width: '100%' }}>
      {/* Analytics Hero Section */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, var(--bg-card), rgba(99, 102, 241, 0.1))',
        padding: '0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="analytics-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2.5rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="circular-progress-container">
              <CircularProgress percentage={filteredSummary.overall_percentage} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Overall Accuracy
              </p>
              <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>
                {filteredSummary.overall_percentage}%
              </h2>
              <div style={{
                marginTop: '0.5rem',
                padding: '0.25rem 0.75rem',
                background: filteredSummary.overall_percentage >= 75 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(225, 29, 72, 0.1)',
                color: filteredSummary.overall_percentage >= 75 ? 'var(--success)' : 'var(--danger)',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'inline-block'
              }}>
                {filteredSummary.overall_percentage >= 75 ? '✓ STATUS: SAFE' : '⚠ STATUS: AT RISK'}
              </div>
            </div>
          </div>

          <div className="stats-cards-container" style={{
            display: 'flex',
            gap: '2.5rem',
            background: 'rgba(255,255,255,0.03)',
            padding: '1.5rem',
            borderRadius: '1.25rem',
            border: '1px solid var(--border)'
          }}>
            <MetricStat label="Subjects" value={filteredSummary.total_subjects} icon={<BookOpen size={16} />} />
            <MetricStat label="Attended" value={filteredSummary.total_attended} icon={<Layers size={16} />} />
            <MetricStat label="Total" value={filteredSummary.total_classes} icon={<Percent size={16} />} />
          </div>
        </div>

        {/* Exclusion Toggle */}
        <div style={{
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <input
              type="checkbox"
              id="excludeTT"
              checked={excludeTT}
              onChange={(e) => setExcludeTT(e.target.checked)}
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <label htmlFor="excludeTT" style={{ fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
              Exclude Technical Training (TT)
            </label>
            <div title="Excluding TT often improves the overall percentage.">
              <Info size={14} style={{ color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard - Graph */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '2rem 2rem 0.5rem 2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <TrendingUp style={{ color: 'var(--primary)' }} />
          <h3 style={{ margin: 0 }}>Attendance Analytics Trend</h3>
        </div>

        <div style={{ overflowX: 'auto', padding: '1.5rem 0' }}>
          <div className="chart-container" style={{ width: '100%', minWidth: '600px', height: 320, padding: '0 2rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPerc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--text-muted)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.75rem',
                    fontSize: '0.8rem',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="percentage"
                  stroke="var(--primary)"
                  fillOpacity={1}
                  fill="url(#colorPerc)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'rgba(255,255,255,0.02)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Subject-wise Analysis</h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div> Above 75%
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--danger)' }}></div> Below 75%
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1.25rem 2rem' }}>Subject Name</th>
                <th style={{ padding: '1.25rem 2rem' }}>Attendance Trend</th>
                <th style={{ padding: '1.25rem 2rem', textAlign: 'center' }}>Present / Total</th>
                <th style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>Requirement</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.map((subject, idx) => (
                <SubjectRow key={idx} subject={subject} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CircularProgress({ percentage }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      <svg style={{ transform: 'rotate(-90deg)', width: '120px', height: '120px' }}>
        <circle
          cx="60" cy="60" r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="10"
          fill="transparent"
        />
        <circle
          cx="60" cy="60" r={radius}
          stroke={percentage >= 75 ? 'var(--success)' : 'var(--danger)'}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.25rem',
        fontWeight: 'bold'
      }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
}

function MetricStat({ label, value, icon }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
        {icon}
        <p style={{ margin: 0, fontSize: '0.7rem', textTransform: 'uppercase' }}>{label}</p>
      </div>
      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}

function SubjectRow({ subject }) {
  const isSafe = subject.percentage >= 75;
  const canBunk = Math.max(0, Math.floor((subject.attended / 0.75) - subject.total));
  const needAttend = Math.max(0, Math.ceil((0.75 * subject.total - subject.attended) / 0.25));

  return (
    <tr style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="subject-row">
      <td style={{ padding: '1.5rem 2rem' }}>
        <div style={{ fontWeight: '500', fontSize: '1rem' }}>{subject.subject}</div>
        <div style={{ fontSize: '0.75rem', color: isSafe ? 'var(--success)' : 'var(--danger)', marginTop: '0.25rem' }}>
          {isSafe ? '✓ Optimized' : '⚠ Action Required'}
        </div>
      </td>
      <td style={{ padding: '1.5rem 2rem', minWidth: '200px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '45px' }}>{Math.round(subject.percentage)}%</span>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${subject.percentage}%`,
              height: '100%',
              background: isSafe ? 'var(--success)' : 'var(--danger)',
              borderRadius: '3px',
              transition: 'width 1s ease-out'
            }}></div>
          </div>
        </div>
      </td>
      <td style={{ padding: '1.5rem 2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1rem', fontWeight: '500' }}>{subject.attended} / {subject.total}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Class Count</div>
      </td>
      <td style={{ padding: '1.5rem 2rem', textAlign: 'right' }}>
        {isSafe ? (
          <div>
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>Bunk {canBunk}</span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Safe Margin</div>
          </div>
        ) : (
          <div>
            <span style={{ color: 'var(--warning)', fontWeight: '600' }}>Attend {needAttend}</span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Goal Offset</div>
          </div>
        )}
      </td>
      <style>{`
        .subject-row:hover {
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </tr>
  );
}

export default AttendanceTable;
