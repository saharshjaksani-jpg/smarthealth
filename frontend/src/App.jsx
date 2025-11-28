import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import AddPrescription from './pages/AddPrescription.jsx'
import Reminders from './pages/Reminders.jsx'
import Caregivers from './pages/Caregivers.jsx'

export default function App() {
  const [open, setOpen] = useState(false)
  const linkStyle = { padding: '10px 12px', borderRadius: 6, textDecoration: 'none', color: '#333', background: '#f7f7f7' }
  const dashboardLinkStyle = { ...linkStyle, color: '#0d6efd', fontWeight: 700 }
  return (
    <div style={{ fontFamily: 'system-ui', padding: 16, position: 'relative' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontWeight: 600 }}>SmartHealth</div>
        <button aria-label="Menu" onClick={() => setOpen(v => !v)} style={{ background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
          <span style={{ display: 'block', width: 22, height: 2, background: '#333', margin: '3px 0' }}></span>
          <span style={{ display: 'block', width: 22, height: 2, background: '#333', margin: '3px 0' }}></span>
          <span style={{ display: 'block', width: 22, height: 2, background: '#333', margin: '3px 0' }}></span>
        </button>
      </header>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.08)' }}></div>
          <div style={{ position: 'fixed', top: 64, right: 16, background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: 8, width: 240, zIndex: 1000 }}>
            <div style={{ display: 'grid', gap: 8 }}>
              <Link to="/" onClick={() => setOpen(false)} style={dashboardLinkStyle}>Dashboard</Link>
              <Link to="/prescriptions/new" onClick={() => setOpen(false)} style={linkStyle}>Add Prescription</Link>
              <Link to="/reminders" onClick={() => setOpen(false)} style={linkStyle}>Reminders</Link>
              <Link to="/caregivers" onClick={() => setOpen(false)} style={linkStyle}>Caregivers</Link>
            </div>
          </div>
        </>
      )}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prescriptions/new" element={<AddPrescription />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/caregivers" element={<Caregivers />} />
      </Routes>
    </div>
  )
}
