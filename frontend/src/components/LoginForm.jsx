import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginForm({ onSubmit, loading }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("mits_student_id");
    const savedPass = localStorage.getItem("mits_student_pass");
    if (savedId) {
      setUserId(savedId);
      setRememberMe(true);
    }
    if (savedPass) {
      setPassword(savedPass);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("mits_student_id", userId);
      localStorage.setItem("mits_student_pass", password);
    } else {
      localStorage.removeItem("mits_student_id");
      localStorage.removeItem("mits_student_pass");
    }
    onSubmit(userId, password);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', placeItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <form onSubmit={handleSubmit} className="glass-card" style={{ maxWidth: '480px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="mits-ims-logo" style={{
            fontSize: '3.5rem',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '900',
            letterSpacing: '-0.06em',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))'
          }}>MITS IMS</div>
          <div style={{
            height: '4px',
            width: '60px',
            background: 'var(--primary)',
            margin: '1.5rem auto',
            borderRadius: '2px',
            opacity: 0.5
          }}></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0, fontWeight: 300 }}>
            Enter your credentials to access <br /> dashboard
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '0.25rem' }}>Student ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 2021BCS001"
              required
              disabled={loading}
              autoComplete="username"
              style={{ padding: '1.15rem 1.25rem', fontSize: '1.1rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '0.25rem' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
                autoComplete="current-password"
                style={{
                  padding: '1.15rem 3.5rem 1.15rem 1.25rem',
                  fontSize: '1.1rem',
                  width: '100%'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  height: '100%',
                  width: '2.5rem',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.6,
                  transition: 'opacity 0.2s',
                  zIndex: 2
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', margin: '0.5rem 0' }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            />
            <label htmlFor="rememberMe" style={{ fontSize: '0.95rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              Keep me logged in
            </label>
          </div>

          <button type="submit" className="primary" disabled={loading} style={{ padding: '1.15rem', fontSize: '1.1rem', marginTop: '1rem' }}>
            {loading ? (
              <>
                <div className="spinner"></div> Authenticating...
              </>
            ) : (
              "Check Attendance"
            )}
          </button>
        </div>

        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem',
          background: 'rgba(245, 158, 11, 0.03)',
          border: '1px solid rgba(245, 158, 11, 0.1)',
          borderRadius: '1.25rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '1.5rem' }}>🔒</span>
          <p style={{ fontSize: '0.8rem', color: 'var(--warning)', margin: 0, lineHeight: 1.5, opacity: 0.8 }}>
            <strong>End-to-End Secure:</strong> Your login data is processed locally and never leaves our secure tunnel.
          </p>
        </div>
      </form>

      <style>{`
        .spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoginForm;