import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [id, setId] = useState('')
  const [pass, setPass] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    if (role === 'student') navigate('/student/home')
    else if (role === 'teacher') navigate('/teacher/home')
    else navigate('/principal/home')
  }

  return (
    <div className="login-page">
      <div className="login-logo">🎓</div>
      <h1 className="login-title">EduSync</h1>
      <p className="login-subtitle">Maharashtra School Management System</p>

      <div className="role-selector">
        <button className={`role-btn ${role === 'student' ? 'selected' : ''}`}
          onClick={() => setRole('student')}>
          <div className="role-btn-icon">🎒</div>
          <div className="role-btn-label">Student</div>
          <div className="role-btn-sub">& Parent</div>
        </button>
        <button className={`role-btn ${role === 'teacher' ? 'selected' : ''}`}
          onClick={() => setRole('teacher')}>
          <div className="role-btn-icon">👩‍🏫</div>
          <div className="role-btn-label">Teacher</div>
          <div className="role-btn-sub">& Staff</div>
        </button>
        <button className={`role-btn ${role === 'principal' ? 'selected' : ''}`}
          onClick={() => setRole('principal')}>
          <div className="role-btn-icon">🏛️</div>
          <div className="role-btn-label">Principal</div>
          <div className="role-btn-sub">Admin</div>
        </button>
      </div>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-field">
          <label>{role === 'student' ? 'Student ID or Mobile Number' : 'Employee ID'}</label>
          <input type="text" placeholder={role === 'student' ? 'e.g. STU-2041 or 9876543210' : 'e.g. EMP-2041'}
            value={id} onChange={e => setId(e.target.value)} autoComplete="username" />
        </div>
        <div className="form-field">
          <label>Password / OTP</label>
          <input type="password" placeholder="Enter password or OTP"
            value={pass} onChange={e => setPass(e.target.value)} autoComplete="current-password" />
        </div>
        <button type="submit" className="login-btn">
          Login to EduSync →
        </button>
        <div className="login-footer-links">
          <button type="button" className="login-link">Forgot Password?</button>
          <button type="button" className="login-link">Request Access</button>
        </div>
      </form>

      <p style={{ marginTop: 32, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
        Language: English | मराठी
      </p>
    </div>
  )
}
